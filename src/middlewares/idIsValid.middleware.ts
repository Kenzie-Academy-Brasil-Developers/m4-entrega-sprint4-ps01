import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { Users } from "../entities/users.entity";

const idIsValidmiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository = AppDataSource.getRepository(Users);

  const idIsValid = await userRepository.findOneBy({
    id: req.params.id,
  });

  if (!idIsValid) {
    return res.status(404).json({ message: "Id not found" });
  }

  return next();
};

export default idIsValidmiddleware;
