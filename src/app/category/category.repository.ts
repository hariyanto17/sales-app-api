import { Category, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createCategory = (category: Category) => {
  return prisma.category.create({
    data: category,
  });
};

export const findCategoryById = (id: string) => {
  return prisma.category.findUnique({
    where: {
      id
    },
  });
};

export const findCategoryByName = (name: string) => {
  return prisma.category.findFirst({
    where: {
      name,
    },
  });
};

export const getAllCategories = () => {
  return prisma.category.findMany();
};

export const updateCategorie = (categoryId: string, category: Category) => {
  return prisma.category.update({
    where: {
      id: categoryId,
    },
    data: category,
  });
};

export const removeCategory = (categoryId: string) => {
  return prisma.category.delete({
    where: {
      id: categoryId,
    },
  });
};
