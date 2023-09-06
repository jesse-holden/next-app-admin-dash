import { randomDelay } from '@/libs/db';

export class User {
  constructor(public id: number, public name: string) {}
}

export class UserRepository {
  users: User[] = [];

  constructor(users: User[] = []) {
    this.users = users;
  }

  public findUserById(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  public findUserByName(name: string): User | undefined {
    return this.users.find((user) => user.name === name);
  }

  public addUser(user: User): void {
    this.users.push(user);
  }

  public removeUserById(id: number): void {
    this.users = this.users.filter((user) => user.id !== id);
  }

  public async findMany(): Promise<User[]> {
    await randomDelay();
    return this.users;
  }
}
