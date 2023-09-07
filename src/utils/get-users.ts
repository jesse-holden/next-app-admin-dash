import 'server-only';
import { getDb } from '@/libs/db';
import { cache } from 'react';

const db = getDb();

export const revalidate = 3600; // revalidate the data at most every hour

export const getUsers = cache(async () => {
  const users = await db.user_repository.findMany();
  return users;
});
