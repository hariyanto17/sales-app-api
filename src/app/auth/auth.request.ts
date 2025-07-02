import Joi from "joi";
import { generalMessage } from "../../utils";

export const createUserSchema = Joi.object({
  name: Joi.string().required().messages(generalMessage),
  username: Joi.string().required().messages(generalMessage),
  password: Joi.string().required().messages(generalMessage),
});

export const loginShema = Joi.object({
  username: Joi.string().required().messages(generalMessage),
  password: Joi.string().required().messages(generalMessage),
});
