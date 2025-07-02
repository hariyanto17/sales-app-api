import { User } from "@prisma/client";
import { Request } from "express";

export interface RegisterRequest extends Request {
  body: User;
}

export interface LoginRequest extends Request {
  body: {
    username: string;
    password: string;
  };
}
