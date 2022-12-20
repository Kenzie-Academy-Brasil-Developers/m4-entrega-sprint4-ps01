import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { Users } from "../entities/users.entity";

const emailUnavailablemiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository = AppDataSource.getRepository(Users);

  const email = req.body.email;

  if (!email) {
    return next();
  }

  const emailUnavailable = await userRepository.findOneBy({
    email: email,
  });

  if (emailUnavailable) {
    return res.status(400).json({ message: "Email unavailable" });
  }

  return next();
};

export default emailUnavailablemiddleware;
