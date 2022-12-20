import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { Users } from "../entities/users.entity";

const invalidObjectMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const keys = Object.keys(req.body);

  const invalidObject = keys.find((key) => {
    return key !== "email" && key !== "name" && key !== "password";
  });

  if (invalidObject) {
    return res.status(401).json({ message: "invalid object" });
  }

  console.log(invalidObject);
  return next();
};

export default invalidObjectMiddleware;
