import { NextFunction, Response } from "express";
import { AppError, ResponseHandler } from "../../utils";
import * as salesServices from "./sale.services";
import { SaleRequest } from "./sales.interface";
import { string } from "joi";

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
