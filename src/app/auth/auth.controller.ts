import { type NextFunction, type Response } from "express";
import { AppError, ResponseHandler } from "../../utils";
import { LoginRequest, RegisterRequest } from "./auth.interface";
import * as authServices from "./auth.services";

export const register = async (
  request: RegisterRequest,
  response: Response,
  next: NextFunction
) => {
  const result = await authServices.register(request.body);

  if (result instanceof AppError) {
    next(result);
    return;
  }

  ResponseHandler.created(response, null, "Berhasil mendaftarkan user baru");
};

export const login = async (
  request: LoginRequest,
  response: Response,
  next: NextFunction
) => {
  const result = await authServices.login(request.body);

  if (result instanceof AppError) {
    next(result);
    return;
  }

  ResponseHandler.ok(response, result, "berhasil masuk");
};
