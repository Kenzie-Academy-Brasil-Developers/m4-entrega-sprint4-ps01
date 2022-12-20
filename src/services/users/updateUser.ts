import { Request } from "express";
import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entity";
import { AppError } from "../../erros";
import { IUserUpdate } from "../../interfaces/users";
import { userResponseSerializer } from "../../serializers/user.serializers";

const updateUserService = async (req: Request, data: IUserUpdate) => {
  const userRepository = AppDataSource.getRepository(Users);
  const user = await userRepository.findOneBy({
    id: req.params.id,
  });

  if (req.user.isAdm === false && req.user.id !== req.params.id) {
    throw new AppError("User dont have authorization", 401);
  }

  const updatedUser = userRepository.create({
    ...user,
    ...data,
  });
  await userRepository.save(updatedUser);

  const userResponse = await userResponseSerializer.validate(updatedUser, {
    stripUnknown: true,
  });

  return userResponse;
};

export default updateUserService;
