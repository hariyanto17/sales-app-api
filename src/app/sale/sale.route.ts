import { Router } from "express";
import catchAsync from "../../utils/catch.async";
import * as saleController from "./sale.controller";
import { validateRequest } from "../../utils/validate.request";
import { createSaleSchema, retrieveSalesSchema } from "./sale.request";
import { authMiddleware } from "../../middleware/auth.middleware";

const route = Router();
route.use(authMiddleware("ADMIN", "USER"));

route.post(
  "/",
  validateRequest(createSaleSchema),
  catchAsync(saleController.create)
);

route.get(
  "/",
  validateRequest(retrieveSalesSchema, "query"),
  catchAsync(saleController.retrieveSales)
);

export default route;
