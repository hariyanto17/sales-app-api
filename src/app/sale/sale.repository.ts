import { Prisma, PrismaClient } from "@prisma/client";
import { PayloadQuery, SaleRequest } from "./sales.interface";
import { AppError } from "../../utils";

const prisma = new PrismaClient();

export const createSale = async (sale: SaleRequest["body"], userId: string) => {
  return prisma.$transaction(async (tx) => {
    const items = await Promise.all(
      sale.saleItem.map(async (item) => {
        const product = await tx.product.findUnique({
          where: { id: item.productId },
        });
        if (!product) {
          throw new AppError(
            "BAD_REQUEST",
            `Produk dengan ID ${item.productId} tidak ditemukan`
          );
        }

        if (item.quantity > product.stock) {
          throw new AppError(
            "BAD_REQUEST",
            `Stok produk dengan ${product.name} tidak mencukupi`
          );
        }

        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: product.stock - item.quantity,
          },
        });

        return {
          productId: item.productId,
          quantity: item.quantity,
          buyPrice: product.buyPrice,
          sellPrice: product.sellPrice,
        };
      })
    );

    const trx = await tx.sale.create({
      data: {
        userId,
        saleItem: {
          create: items,
        },
      },
    });
    return trx;
  });
};

export const retrieveSales = async ({
  startDate,
  endDate,
  categoryId,
  productId,
}: PayloadQuery) => {
  const conditions: Prisma.SaleItemWhereInput[] = [
    {
      sale: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    },
  ];

  if (categoryId) {
    conditions.push({ product: { categoryId } });
  }
  if (productId) {
    conditions.push({ productId });
  }

  const where: Prisma.SaleItemWhereInput = { AND: conditions };

  const totalProductsSoldResult = await prisma.saleItem.aggregate({
    where,
    _sum: {
      quantity: true,
    },
  });

  const totalProductsSold = totalProductsSoldResult._sum.quantity || 0;

  const profitResult: [{ totalprofit: bigint | null }] = await prisma.$queryRaw`
  SELECT SUM((si."sellPrice" - si."buyPrice") * si.quantity) AS "totalprofit"
  FROM "sale_item" AS si
  JOIN "sale" AS s ON si."saleId" = s.id
  WHERE s."createdAt" BETWEEN ${startDate} AND ${endDate}
  ${
    categoryId
      ? Prisma.sql`AND si."productId" IN (SELECT id FROM "Product" WHERE "categoryId" = ${categoryId})`
      : Prisma.empty
  }
  ${productId ? Prisma.sql`AND si."productId" = ${productId}` : Prisma.empty}
`;

  const totalProfit = Number(profitResult[0].totalprofit) || 0;

  const sales = await prisma.sale.findMany({
    where: { AND: conditions.map((c) => ({ saleItem: { some: c } })) },
    include: {
      saleItem: {
        select: {
          id: true,
          quantity: true,
          product: {
            select: {
              name: true,
              description: true,
            },
          },
        },
      },
      user: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalSales = sales.length;

  return {
    sales,
    totalSales,
    totalProductsSold,
    totalProfit,
  };
};
