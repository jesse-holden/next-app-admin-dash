import { randomDelay } from '@/libs/db';

let _id = 0;

const generateId = () => ++_id;

const force_unique_name = true;

export class User {
  public id: number;
  constructor(public name: string) {
    this.id = generateId();
  }
}

export class UserRepository {
  constructor(private users: User[] = []) {}

  public findUserById(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  public findUserByName(name: string): User | undefined {
    return this.users.find((user) => user.name === name);
  }

  public async addUser(user: User): Promise<void> {
    await randomDelay();
    if (force_unique_name && this.findUserByName(user.name)) {
      throw new Error(`User with name ${user.name} already exists`);
    }
    this.users.push(user);
  }

  public removeUserById(id: number): void {
    this.users = this.users.filter((user) => user.id !== id);
  }

  public async findMany(): Promise<User[]> {
    await randomDelay();
    return this.users.slice().sort((a, b) => a.id - b.id);
  }
}
