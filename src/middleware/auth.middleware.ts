import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { config } from "../utils";
import { CustomRequest, PayloadAccessToken } from "../utils/interface";

type Roles = "ADMIN" | "USER";

export const authMiddleware =
  (...roles: Roles[]) =>
  (request: Request, response: Response, next: NextFunction) => {
    const token = request.headers.authorization?.split(" ")[1];
    console.log("token", token);
    if (!token) {
      return response.status(401).send({
        code: 401,
        status: "Unauthorized",
        message: "Authorization tidak ditemukan.",
      });
    }

    const decoded = verify(
      token,
      config.jwt.accessPrivateKey
    ) as PayloadAccessToken;
    if (!decoded) {
      return response.status(401).send({
        code: 401,
        status: "Unauthorized",
        message: "Authorization tidak valid.",
      });
    }

    const role = decoded["role"] as Roles;
    if (!roles.includes(role)) {
      return response.status(403).send({
        code: 403,
        status: "Forbidden",
        message: "Anda tidak memiliki akses ke resource ini.",
      });
    }

    (request as CustomRequest).auth = decoded;
    next();
  };
