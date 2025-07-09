import { Product, Sale, SaleItem, User } from "@prisma/client";

type SaleItems = Pick<SaleItem, "id" | "quantity"> & {
  product: Pick<Product, "name" | "description">;
};

type Sales = Sale & {
  user: Pick<User, "name">;
  saleItem: SaleItems[];
};

export const retrieveSalesDTO = (sales: Sales[]) => {
  return sales.map((sale) => ({
    id: sale.id,
    createdAt: sale.createdAt,
    createBy: sale.user.name,
    saleItems: sale.saleItem.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      productName: item.product.name,
      productDescription: item.product.description,
    })),
  }));
};
