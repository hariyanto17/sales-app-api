import { Router } from "express";
import catchAsync from "../../utils/catchAsync";
import * as authController from "./category.controller";
import { validateRequest } from "../../middleware/validate-request";
import { createCategorySchema } from "./category.request";

const route = Router();

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
