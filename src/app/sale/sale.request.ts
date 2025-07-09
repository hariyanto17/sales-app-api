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
    .messages(generalMessage),
}).messages(generalMessage);

export const retrieveSalesSchema = Joi.object({
  startDate: Joi.date().required().messages(generalMessage),
  endDate: Joi.date().required().messages(generalMessage),
  categoryId: Joi.string().optional().messages(generalMessage),
  productId: Joi.string().optional().messages(generalMessage),
}).messages(generalMessage);
