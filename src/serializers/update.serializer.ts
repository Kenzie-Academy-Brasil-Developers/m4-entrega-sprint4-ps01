import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserUpdate } from "../interfaces/users";

const updateSerializer: SchemaOf<IUserUpdate> = yup.object().shape({
  email: yup.string(),
  name: yup.string(),
  password: yup.string(),
});

export default updateSerializer;
