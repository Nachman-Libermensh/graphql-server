import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { CreateUserInput, UpdateUserInput } from './user.input';

@Injectable()
export class UserService {
  private users: User[] = [
    {
      id: '1',
      name: 'יוחנן כהן',
      email: 'yochanan@example.com',
      age: 30,
    },
    {
      id: '2',
      name: 'שרה לוי',
      email: 'sarah@example.com',
      age: 25,
    },
  ];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  create(createUserInput: CreateUserInput): User {
    const newUser: User = {
      id: (this.users.length + 1).toString(),
      ...createUserInput,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: string, updateUserInput: UpdateUserInput): User | undefined {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return undefined;
    }

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updateUserInput,
    };

    return this.users[userIndex];
  }

  remove(id: string): boolean {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return false;
    }

    this.users.splice(userIndex, 1);
    return true;
  }
}
