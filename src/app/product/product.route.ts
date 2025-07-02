import { Router } from "express";
import catchAsync from "../../utils/catch.async";
import * as productController from "./product.controller";
import { validateRequest } from "../../utils/validate.request";
import { createProductSchema } from "./product.request";
import { authMiddleware } from "../../middleware/auth.middleware";

const route = Router();

route.use(authMiddleware("ADMIN"));

route.post(
  "/",
  validateRequest(createProductSchema),
  catchAsync(productController.create)
);

route.get("/", catchAsync(productController.retrive));
route.get(
  "/category/:categoryId",
  catchAsync(productController.retriveByCategory)
);
route.get("/:productId", catchAsync(productController.retriveById));
route.patch("/:productId", catchAsync(productController.update));

route.delete("/:productId", catchAsync(productController.remove));

export default route;
