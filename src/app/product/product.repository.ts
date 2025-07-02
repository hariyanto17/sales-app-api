import { PrismaClient, Product } from "@prisma/client";

const prisma = new PrismaClient();

export const createProduct = (product: Product) => {
  return prisma.product.create({
    data: product,
  });
};

export const findProductByName = (name: string) => {
  return prisma.product.findFirst({
    where: {
      name,
    },
  });
};

export const getAllProducts = () => {
  return prisma.product.findMany();
};

export const getProductsByCategory = (categoryId: string) => {
  return prisma.product.findMany({
    where: {
      categoryId,
    },
  });
};

export const getProductsById = (productId: string) => {
  return prisma.product.findUnique({
    where: {
      id: productId,
    },
  });
};

export const updateProduct = (productId: string, product: Product) => {
  return prisma.product.update({
    where: {
      id: productId,
    },
    data: product,
  });
};

export const removeProduct = (productId: string) => {
  return prisma.product.delete({
    where: {
      id: productId,
    },
  });
};
