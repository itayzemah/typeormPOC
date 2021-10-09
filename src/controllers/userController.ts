import "reflect-metadata";
import { Request, Response, NextFunction } from "express";
import { getRepository, UpdateResult } from "typeorm";
import { User } from "../entity/User";
import { createConnection } from "typeorm";

const connection = createConnection();
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  // console.log(req);
  const users: User[] = await (await connection).manager.find(User);

  return res.status(200).json({
    data: users,
  });
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const user: User | undefined = await (await connection)
    .getRepository(User)
    .createQueryBuilder("user")
    .where("user.id = :id", { id: "C257014F-EB27-EC11-8A54-708BCD9E156A" })
    .getOne();

  return res.status(200).json({
    data: user,
  });
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const user: User[] = await (await connection)
    .getRepository(User)
    .save<User>(req.body);

  return res.status(200).json({
    data: user,
  });
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const result: UpdateResult = await (
    await connection
  )
    .getRepository(User)
    .createQueryBuilder()
    .update(User)
    .set({ ...req.body })
    .where("id= :id", { id: req.query.id })
    .execute();

  return res.status(200).json({
    data: result,
  });
};

export default { getAllUsers, getUser, createUser, updateUser };
