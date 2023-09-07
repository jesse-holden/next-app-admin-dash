import { User, UserRepository } from '@/entities/user';

class DB {
  constructor(public user_repository = new UserRepository()) {}
}

let db: DB;

export const getDb = () => {
  return (db = db ?? new DB());
};

export const resetDb = () => {};

export const seedDb = async () => {
  const db = getDb();
  await db.user_repository.addUser(new User('John Doe'));
  await db.user_repository.addUser(new User('Jane Doe'));
};

export const fakeDelay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const randomDelay = () => {
  const max = 1000;
  const min = 200;
  const ms = Math.floor(Math.random() * (max - min + 1) + min);
  return fakeDelay(ms);
};
