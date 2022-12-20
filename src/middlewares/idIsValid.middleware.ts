import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { Users } from "../entities/users.entity";

const idIsValidmiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // try {
  const userRepository = AppDataSource.getRepository(Users);

  const idIsValid = await userRepository.findOneBy({
    id: req.params.id,
  });

  if (!idIsValid) {
    return res.status(404).json({ message: "Id not found" });
  }

  return next();
  // } catch (error) {
  //   return res.status(405).json({ message: "Method not allowed" });
  // }
};

export default idIsValidmiddleware;
