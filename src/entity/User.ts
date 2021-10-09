import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Tweet } from "./Tweet";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ type: "nvarchar" })
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: "decimal", precision: 4, scale: 2 })
  age: number;

  @OneToMany((type) => Tweet, (tweet) => tweet.user)
  tweets: Promise<Tweet[]>;
}
