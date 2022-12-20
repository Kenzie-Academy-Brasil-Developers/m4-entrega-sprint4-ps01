import { Router } from "express";
import { CreateSessionController } from "../controlles/session.controllers";
import dataIsValid from "../middlewares/dataIsValid.middleware";
import loginSerializer from "../serializers/login.serializer";

const sessionRoutes = Router();

sessionRoutes.post("", dataIsValid(loginSerializer), CreateSessionController);

export default sessionRoutes;
