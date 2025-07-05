import { createSale } from "./sale.repository";
import { SaleRequest } from "./sales.interface";

export const create = async (body: SaleRequest["body"], userId: string) => {
  return createSale(body, userId);
};
