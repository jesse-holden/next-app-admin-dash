import { User, UserRepository } from '@/entities/user';

class DB {
  constructor(public user_repository = new UserRepository()) {}
}

let db: DB;

export const getDb = () => {
  if (!db) {
    db = new DB();
    seedDb();
  }

  return db;
};

export const resetDb = () => {
  return (db = new DB());
};

export const seedDb = () => {
  const db = getDb();
  db.user_repository.addUser(new User('John Doe'));
  db.user_repository.addUser(new User('Jane Doe'));
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
