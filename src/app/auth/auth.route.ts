import { Router } from "express";
import catchAsync from "../../utils/catch.async";
import * as authController from "./auth.controller";
import { validateRequest } from "../../utils/validate.request";
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
