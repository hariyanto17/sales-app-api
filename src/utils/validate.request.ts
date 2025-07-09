import { ResponseHandler } from ".";
import { type NextFunction, type Request, type Response } from "express";
import type Joi from "joi";
import { cleanJoiErrorMessage } from "./clean.joi.error.message";

export const validateRequest =
  (schema: Joi.ObjectSchema, type: "Body" | "query" = "Body") =>
  (request: Request, response: Response, next: NextFunction) => {
    const value = type === "Body" ? request.body : request.query;
    const { error } = schema.validate(value);
    if (error) {
      ResponseHandler.badRequest(next, cleanJoiErrorMessage(error));
      return;
    }
    next();
  };
