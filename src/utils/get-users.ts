import 'server-only';
import { getDb } from '@/libs/db';
import { cache } from 'react';
import { User } from '@/entities/user';

const db = getDb();

export const revalidate = 3600; // revalidate the data at most every hour

export const getUsers = cache(async () => {
  const users = await db.user_repository.findMany();
  return users;
});

export const addUser = async (name: string) => {
  const new_user = new User(name);
  const user = await db.user_repository.addUser(new_user);
  return user;
};
