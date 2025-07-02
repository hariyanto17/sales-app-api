import { Category } from "@prisma/client";
import { Request } from "express";

export interface CategoryRequest extends Request {
  body: Category;
}
