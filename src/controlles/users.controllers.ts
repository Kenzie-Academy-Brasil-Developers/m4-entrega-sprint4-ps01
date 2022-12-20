import { Request, Response } from "express";
import { IUserRequest, IUserUpdate } from "../interfaces/users";
import allUsersService from "../services/users/allUsers";
import createUserService from "../services/users/createUser";
import deleteUserService from "../services/users/deleteUser";
import updateUserService from "../services/users/updateUser";

const createUserController = async (req: Request, res: Response) => {
  const userData: IUserRequest = req.body;
  const newUser = await createUserService(userData);
  return res.status(201).json(newUser);
};

const allUsersController = async (req: Request, res: Response) => {
  const allUsers = await allUsersService();
  return res.status(200).json(allUsers);
};

const updateUserController = async (req: Request, res: Response) => {
  const updateData: IUserUpdate = req.body;
  const updatedUser = await updateUserService(req, updateData);
  return res.status(200).json(updatedUser);
};

const deleteUserController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const deletedUser = await deleteUserService(id);
  return res.status(204).json(deletedUser);
};

export {
  createUserController,
  allUsersController,
  updateUserController,
  deleteUserController,
};
