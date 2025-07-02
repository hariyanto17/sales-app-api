import { Request, type NextFunction, type Response } from "express";
import { AppError, ResponseHandler } from "../../utils";
import { CategoryRequest } from "./category.interface";
import * as categoryServices from "./category.services";

export const create = async (
  request: CategoryRequest,
  response: Response,
  next: NextFunction
) => {
  const result = await categoryServices.create(request.body);

  if (result instanceof AppError) {
    next(result);
    return;
  }

  ResponseHandler.created(
    response,
    result,
    "Berhasil mendaftarkan category baru"
  );
};

export const retrive = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const result = await categoryServices.retrive();

  if (result instanceof AppError) {
    next(result);
    return;
  }

  ResponseHandler.ok(response, result);
};

export const update = async (
  request: CategoryRequest,
  response: Response,
  next: NextFunction
) => {
  const { categoryId } = request.params;
  const result = await categoryServices.update(categoryId, request.body);

  if (result instanceof AppError) {
    next(result);
    return;
  }

  ResponseHandler.ok(response, result);
};


export const remove = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { categoryId } = request.params;
  const result = await categoryServices.remove(categoryId);

  if (result instanceof AppError) {
    next(result);
    return;
  }

  ResponseHandler.ok(response, result);
};
