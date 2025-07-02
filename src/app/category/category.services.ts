import { ERROR_CODE } from "../../interface";
import { AppError } from "../../utils";
import { CategoryRequest } from "./category.interface";
import {
    createCategory,
    findCategoryByName,
    getAllCategories,
    removeCategory,
    updateCategorie,
} from "./category.repository";

export const create = async (body: CategoryRequest["body"]) => {
  const { name } = body;
  const category = await findCategoryByName(name);
  if (category) {
    return new AppError(ERROR_CODE.CONFLICT.code, "Nama kategory suda ada");
  }
  return createCategory(body);
};

export const retrive = async () => {
  return await getAllCategories();
};

export const update = async (
  categoryId: string,
  body: CategoryRequest["body"]
) => {
  return await updateCategorie(categoryId, body);
};

export const remove = async (categoryId: string) => {
  return await removeCategory(categoryId);
};
