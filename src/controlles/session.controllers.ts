import { Request, Response } from "express";
import { IUserLogin } from "../interfaces/users";
import createSessionService from "../services/session/createSession";

const CreateSessionController = async (req: Request, res: Response) => {
  const loginData: IUserLogin = req.body;
  const token = await createSessionService(loginData);
  return res.status(200).json({ token });
};

export { CreateSessionController };
