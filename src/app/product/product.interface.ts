import { Product } from "@prisma/client";
import { Request } from "express";

export interface productRequest extends Request {
  body: Product;
}
