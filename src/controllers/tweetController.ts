import "reflect-metadata";
import { Request, Response, NextFunction } from "express";
import { getRepository, UpdateResult } from "typeorm";
import { createConnection } from "typeorm";
import { Tweet } from "../entity/Tweet";

const tweetRepo = createConnection().then((conn) => conn.getRepository(Tweet));

const getAllTweets = async (req: Request, res: Response) => {
  const tweets = await (await tweetRepo).find();
  return res.status(200).json({
    data: tweets,
  });
};
const getTweet = async (req: Request, res: Response, next: NextFunction) => {
  const tweet: Tweet | undefined = await (
    await tweetRepo
  ).findOne({ where: `id = ${req.query.id}` });
  return res.status(200).json({
    data: tweet,
  });
};
const createTweet = async (req: Request, res: Response, next: NextFunction) => {
  const tweets: Tweet[] = await (await tweetRepo).save<Tweet>(req.body);

  return res.status(200).json({
    data: tweets,
  });
};
const updateTweet = async (req: Request, res: Response, next: NextFunction) => {
  const result: UpdateResult = await (
    await tweetRepo
  )
    .createQueryBuilder()
    .update(Tweet)
    .set({ ...req.body })
    .where("id= :id", { id: req.query.id })
    .execute();

  return res.status(200).json({
    data: result,
  });
};
const getTweetsByUser = async (req: Request, res: Response) => {
  const tweets = await (
    await tweetRepo
  ).find({
    where: `userid = '${req.query.id}'`,
  });

  return res.status(200).json({
    data: tweets,
  });
};
export default {
  getAllTweets,
  getTweet,
  createTweet,
  updateTweet,
  getTweetsByUser,
};
