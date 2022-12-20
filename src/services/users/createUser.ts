import { IUser, IUserRequest } from "../../interfaces/users";
import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entity";
import { userResponseSerializer } from "../../serializers/user.serializers";

const createUserService = async (userData: IUserRequest): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(Users);

  const user = userRepository.create(userData);
  await userRepository.save(user);

  const userResponse = await userResponseSerializer.validate(user, {
    stripUnknown: true,
  });

  return userResponse;
};

export default createUserService;
