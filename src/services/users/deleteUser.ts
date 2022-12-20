import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entity";
import { AppError } from "../../erros";

const deleteUserService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(Users);
  const user = await userRepository.findOneBy({
    id: id,
  });

  if (user.isActive === false) {
    throw new AppError("User is already delete", 400);
  }

  user.isActive = false;
  await userRepository.save(user);
  return {};
};

export default deleteUserService;
