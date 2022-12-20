import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUser, IUserRequest } from "../interfaces/users";

const userRequestSerializer: SchemaOf<IUserRequest> = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().required(),
  password: yup.string().required(),
  isAdm: yup.boolean().required(),
});

const userResponseSerializer: SchemaOf<IUser> = yup.object().shape({
  id: yup.string(),
  name: yup.string(),
  email: yup.string().email(),
  isAdm: yup.boolean(),
  isActive: yup.boolean(),
  createdAt: yup.date(),
  updatedAt: yup.date(),
});

export { userRequestSerializer, userResponseSerializer };
