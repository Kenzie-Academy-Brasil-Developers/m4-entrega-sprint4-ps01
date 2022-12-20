import { Router } from "express";
import {
  allUsersController,
  createUserController,
  deleteUserController,
  updateUserController,
} from "../controlles/users.controllers";
import authMiddleware from "../middlewares/auth.middleware";
import dataIsValid from "../middlewares/dataIsValid.middleware";
import emailUnavailablemiddleware from "../middlewares/emailUnavailable.middleware";
import idIsValidmiddleware from "../middlewares/idIsValid.middleware";
import invalidObjectMiddleware from "../middlewares/invalidObject.middleware";
import isAdmMiddleware from "../middlewares/isAdm.middleware";
import updateSerializer from "../serializers/update.serializer";
import { userRequestSerializer } from "../serializers/user.serializers";

const userRoutes = Router();

userRoutes.post(
  "",
  dataIsValid(userRequestSerializer),
  emailUnavailablemiddleware,
  createUserController
);
userRoutes.get("", authMiddleware, isAdmMiddleware, allUsersController);
userRoutes.patch(
  "/:id",
  authMiddleware,
  invalidObjectMiddleware,
  dataIsValid(updateSerializer),
  idIsValidmiddleware,
  emailUnavailablemiddleware,
  updateUserController
);

userRoutes.delete(
  "/:id",
  authMiddleware,
  isAdmMiddleware,
  idIsValidmiddleware,
  deleteUserController
);

export default userRoutes;
