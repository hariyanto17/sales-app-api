import { Request, type NextFunction, type Response } from "express";
import { AppError, ResponseHandler } from "../../utils";
import { productRequest } from "./product.interface";
import * as productServices from "./product.services";

export const create = async (
  request: productRequest,
  response: Response,
  next: NextFunction
) => {
  const result = await productServices.create(request.body);

  if (result instanceof AppError) {
    next(result);
    return;
  }

  ResponseHandler.created(response, null, "Berhasil mendaftarkan product baru");
};

export const retrive = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const result = await productServices.retrive();

  if (result instanceof AppError) {
    next(result);
    return;
  }

  ResponseHandler.ok(response, result);
};

export const retriveByCategory = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { categoryId } = request.params;
  const result = await productServices.retriveByCategory(categoryId);

  if (result instanceof AppError) {
    next(result);
    return;
  }

  ResponseHandler.ok(response, result);
};
export const retriveById = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { productId } = request.params;
  const result = await productServices.retriveByProductId(productId);

  if (result instanceof AppError) {
    next(result);
    return;
  }

  ResponseHandler.ok(response, result);
};

export const update = async (
  request: productRequest,
  response: Response,
  next: NextFunction
) => {
  const { productId } = request.params;
  const result = await productServices.update(productId, request.body);

  if (result instanceof AppError) {
    next(result);
    return;
  }

  ResponseHandler.created(response, null, "Berhasil mendaftarkan product baru");
};


export const remove = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { productId } = request.params;
  const result = await productServices.remove(productId);

  if (result instanceof AppError) {
    next(result);
    return;
  }

  ResponseHandler.ok(response, result);
};
