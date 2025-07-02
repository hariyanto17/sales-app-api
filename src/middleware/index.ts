import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import { AppError } from "../utils";

import { ERROR_CODE } from "../interface";

import authRoute from "../app/auth/auth.route";
import categoryRoute from "../app/category/category.route"
import productRoute from "../app/product/product.route"

const router = express.Router();

router.use("/auth", authRoute);
router.use("/category", categoryRoute);
router.use("/product", productRoute);


router.use("*", (req: Request, res: Response, next: NextFunction) => {
  const error = new AppError(ERROR_CODE.NOT_FOUND.code);
  next(error);
});

export default router;
