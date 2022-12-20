import { IUserLogin } from "../../interfaces/users";
import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entity";
import { AppError } from "../../erros";
import "dotenv/config";

const createSessionService = async ({
  email,
  password,
}: IUserLogin): Promise<string> => {
  const userRepository = AppDataSource.getRepository(Users);

  const user = await userRepository.findOneBy({
    email: email,
  });

  if (!user) {
    throw new AppError("Email or password invalid", 403);
  }

  const passwordMatch = await compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError("Email or password invalid", 403);
  }

  const token = jwt.sign(
    {
      isAdm: user.isAdm,
    },
    process.env.SECRET_KEY,
    {
      subject: user.id,
      expiresIn: "24h",
    }
  );

  return token;
};

export default createSessionService;
