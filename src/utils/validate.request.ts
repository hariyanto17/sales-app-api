import { ResponseHandler } from ".";
import { type NextFunction, type Request, type Response } from "express";
import type Joi from "joi";
import { cleanJoiErrorMessage } from "./clean.joi.error.message";

export const validateRequest =
  (schema: Joi.ObjectSchema) =>
  (request: Request, response: Response, next: NextFunction) => {
    const { error } = schema.validate(request.body);
    if (error) {
      ResponseHandler.badRequest(next, cleanJoiErrorMessage(error));
      return;
    }
    next();
  };
