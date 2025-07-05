import Joi from "joi";
import { generalMessage } from "../../utils";

export const createSaleSchema = Joi.object({
  saleItem: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().required().messages(generalMessage),
        quantity: Joi.number()
          .integer()
          .min(1)
          .required()
          .messages(generalMessage),
      })
    )
    .required()
    .messages({
      "array.base": "Sale items must be an array",
      "array.empty": "Sale items cannot be empty",
      "array.min": "Sale items must contain at least one item",
      "any.required": "Sale items are required",
      "object.base": "Each sale item must be an object",
      "object.unknown": "Sale item contains unknown fields",
      "string.base": "Product ID must be a string",
      "string.empty": "Product ID cannot be empty",
      "number.base": "Quantity, unit price, and buy price must be numbers",
      "number.integer": "Quantity, unit price, and buy price must be integers",
    }),
}).messages(generalMessage);
