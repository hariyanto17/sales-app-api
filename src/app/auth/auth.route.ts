import { Router } from "express";
import catchAsync from "../../utils/catchAsync";
import * as authController from "./auth.controller";
import { validateRequest } from "../../middleware/validate-request";
import { createUserSchema, loginShema } from "./auth.request";

const route = Router();

route.post(
  "/register",
  validateRequest(createUserSchema),
  catchAsync(authController.register)
);

route.post(
  "/login",
  validateRequest(loginShema),
  catchAsync(authController.login)
);
export default route;
