import { PrismaClient } from "@prisma/client";
import { SaleRequest } from "./sales.interface";
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
          unitPrice: product.buyPrice,
          buyPrice: product.sellPrice,
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
