import bcrypt from "bcrypt";
import { ERROR_CODE } from "../../interface";
import { AppError } from "../../utils";
import { LoginRequest, RegisterRequest } from "./auth.interface";
import { createUser, findUserByEmail } from "./auth.repository";
import { generateAccessToken, generateRefreshToken } from "./auth.token";

export const register = async (body: RegisterRequest["body"]) => {
  const { username } = body;
  const user = await findUserByEmail(username);
  if (user) {
    return new AppError(ERROR_CODE.CONFLICT.code, "Username suda di gunakan");
  }
  const password = await bcrypt.hash(body.password, 10);
  return createUser({ ...body, password });
};

export const login = async (body: LoginRequest["body"]) => {
  const { username, password } = body;
  const user = await findUserByEmail(username);

  if (!user) {
    return new AppError(ERROR_CODE.NOT_FOUND.code, "Username tidak di temukan");
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return new AppError(ERROR_CODE.NOT_FOUND.code, "Password tidak sesuai");
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return {
    accessToken,
    refreshToken,
    userId: user.id,
  };
};
