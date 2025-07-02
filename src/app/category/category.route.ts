import { Router } from "express";
import catchAsync from "../../utils/catch.async";
import * as authController from "./category.controller";
import { validateRequest } from "../../utils/validate.request";
import { createCategorySchema } from "./category.request";
import { authMiddleware } from "../../middleware/auth.middleware";

const route = Router();

route.use(authMiddleware("ADMIN"));

route.post(
  "/",
  validateRequest(createCategorySchema),
  catchAsync(authController.create)
);

route.get("/", catchAsync(authController.retrive));
route.patch(
  "/:categoryId",
  validateRequest(createCategorySchema),
  catchAsync(authController.update)
);

route.delete("/:categoryId", catchAsync(authController.remove));

export default route;
