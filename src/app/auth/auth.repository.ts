import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = (user: User) => {
  return prisma.user.create({
    data: user,
  });
};

export const findUserByEmail = (username: string) => {
  return prisma.user.findUnique({
    where: { username },
  });
};
