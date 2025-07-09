import e from "express";
import { createSale, retrieveSales } from "./sale.repository";
import { PayloadQuery, SaleRequest } from "./sales.interface";
import { AppError } from "../../utils";
import { ERROR_CODE } from "../../utils/interface";
import { retrieveSalesDTO } from "./sale.dto";

export const create = (body: SaleRequest["body"], userId: string) => {
  return createSale(body, userId);
};

export const getSales = async (query: PayloadQuery) => {
  if (query.startDate > query.endDate) {
    throw new AppError(
      ERROR_CODE.BAD_REQUEST.code,
      "Tanggal mulai tidak boleh lebih besar dari tanggal akhir"
    );
  }
  const { sales, totalProductsSold, totalProfit, totalSales } =
    await retrieveSales(query);

  return {
    details: retrieveSalesDTO(sales),
    totalProductsSold,
    totalProfit,
    totalSales,
  };
};
