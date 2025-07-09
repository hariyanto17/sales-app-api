import { NextFunction, Response } from "express";
import { AppError, dateUtc, ResponseHandler } from "../../utils";
import * as salesServices from "./sale.services";
import {
  PayloadQuery,
  SaleRequest,
  SaleRequestWithQuery,
} from "./sales.interface";

export const create = async (
  request: SaleRequest,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const userId = request.auth.id;
  const result = await salesServices.create(request.body, userId);
  if (result instanceof AppError) {
    next(result);
    return;
  }
  ResponseHandler.created(response, result);
};

export const retrieveSales = async (
  request: SaleRequestWithQuery,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const { startDate, endDate } = request.query;

  const query: PayloadQuery = {
    ...request.query,
    startDate: dateUtc({ date: startDate }),
    endDate: dateUtc({
      date: endDate,
      hours: 23,
      minutes: 59,
      seconds: 59,
      milliseconds: 999,
    }),
  };

  const result = await salesServices.getSales(query);

  if (result instanceof AppError) {
    next(result);
    return;
  }
  ResponseHandler.ok(response, result);
};
