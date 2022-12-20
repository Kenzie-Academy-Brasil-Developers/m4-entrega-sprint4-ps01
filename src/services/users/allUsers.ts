import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entity";
import { IUser } from "../../interfaces/users";
import { userResponseSerializer } from "../../serializers/user.serializers";

const allUsersService = async (): Promise<IUser[]> => {
  const userRepository = AppDataSource.getRepository(Users);

  const users = await userRepository.find();

  const auxUsers = await Promise.all(
    users.map(async (el) => {
      const allUsers = await userResponseSerializer.validate(el, {
        stripUnknown: true,
      });

      return allUsers;
    })
  );

  return auxUsers;
};

export default allUsersService;
