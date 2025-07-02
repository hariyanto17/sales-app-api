import dotenv from "dotenv";

dotenv.config();

export const config = {
  jwt: {
    accessPrivateKey: process.env.JWT_ACCESS_PRIVATE_KEY ?? "default",
    refreshPrivateKey: process.env.JWT_REFRESH_PRIVATE_KEY ?? "default",
  },
};
