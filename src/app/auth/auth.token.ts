import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { config } from "../../utils";

interface TokenPayload {
  payload: any;
  expired: number;
  secretKey: string;
}

export const generateAccessToken = (user: User): string => {
  const expiredDays = 1;
  const expiredSecond = expiredDays * 24 * 60 * 60;
  const expired = Math.floor(new Date().getTime() / 1000.0) + expiredSecond;
  return generateToken({
    payload: {
      name: user.name,
      id: user.id,
      email: user.username,
      role: user.role,
    },
    expired,
    secretKey: config.jwt.accessPrivateKey,
  });
};

export const generateRefreshToken = (user: User): string => {
  const expiredDays = 14;
  const expired = expiredDays * 24 * 60 * 60;
  return generateToken({
    payload: {
      type: "REFRESH",
      userId: user.id,
      role: user.role,
    },
    expired,
    secretKey: config.jwt.accessPrivateKey,
  });
};

export const generateToken = ({
  payload,
  secretKey,
  expired,
}: TokenPayload): string => {
  const iat = Math.floor(new Date().getTime() / 1000.0);
  const exp = iat + expired;

  return jwt.sign({ ...payload, iat, exp }, secretKey);
};
