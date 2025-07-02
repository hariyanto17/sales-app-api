import Joi from "joi";
import { generalMessage } from "../../utils";

export const createCategorySchema = Joi.object({
  name: Joi.string().required().messages(generalMessage),
});
