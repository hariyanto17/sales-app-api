import { ERROR_CODE } from "../../interface";
import { AppError } from "../../utils";
import { findCategoryById } from "../category/category.repository";

import { productRequest } from "./product.interface";
import {
  createProduct,
  findProductByName,
  getAllProducts,
  getProductsByCategory,
  getProductsById,
  removeProduct,
  updateProduct,
} from "./product.repository";

export const create = async (body: productRequest["body"]) => {
  const { name, categoryId } = body;
  const category = await findCategoryById(categoryId);
  console.log({ category, categoryId });
  if (!category) {
    return new AppError(ERROR_CODE.CONFLICT.code, "categori tidak di temukan");
  }
  const product = await findProductByName(name);
  if (product) {
    return new AppError(ERROR_CODE.CONFLICT.code, "Nama Product suda ada");
  }
  return createProduct({ ...body });
};

export const retrive = async () => {
  return await getAllProducts();
};

export const retriveByCategory = async (categoryId: string) => {
  return await getProductsByCategory(categoryId);
};

export const retriveByProductId = async (productId: string) => {
  console.log("productId", productId);
  return await getProductsById(productId);
};

export const update = async (
  productId: string,
  body: productRequest["body"]
) => {
  return await updateProduct(productId, body);
};


export const remove = async(productId: string) => {
    return await removeProduct(productId)
}