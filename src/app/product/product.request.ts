import Joi from "joi";
import { generalMessage } from "../../utils";

export const createProductSchema = Joi.object({
  name: Joi.string().required().messages(generalMessage),
  description: Joi.string().required().messages(generalMessage),
  categoryId: Joi.string().required().messages(generalMessage),
  buyPrice: Joi.number().required().messages(generalMessage),
  sellPrice: Joi.number().required().messages(generalMessage),
  stock: Joi.number().required().messages(generalMessage),
});
