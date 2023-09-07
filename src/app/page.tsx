import UserForm from '@/components/forms/user-form';
import { addUser, getUsers } from '@/utils/get-users';
import { revalidatePath } from 'next/cache';
import { Suspense } from 'react';

async function UserList() {
  const users = await getUsers();

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          #{user.id} {user.name}
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  async function create(formData: FormData) {
    'use server';

    if (!formData.get('name')) {
      return { message: 'Invalid name.' };
    }

    try {
      // mutate
      await addUser(formData.get('name') as string);
      // revalidate cache
      revalidatePath('/');
      return { message: 'Success!' };
    } catch (error) {
      return { message: 'There was an error.' };
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="flex flex-col w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <Suspense fallback={<p>Loading...</p>}>
            <div className="flex mb-8">
              <UserList />
            </div>
            <div className="flex">
              <UserForm create={create} />
            </div>
          </Suspense>
        </div>
      </div>
    </main>
  );
}
