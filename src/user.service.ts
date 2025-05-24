/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { CreateUserInputDto, UpdateUserInputDto, UserFilterDto } from './user.input';
import { UserMapper } from './user-mapper';
@Injectable()
export class UserService {
  private users: UserEntity[] = [
    new UserEntity({
      id: '1',
      name: 'יוחנן כהן',
      email: 'yochanan@example.com',
      age: 30,
    }),
    new UserEntity({
      id: '2',
      name: 'שרה לוי',
      email: 'sarah@example.com',
      age: 25,
    }),
  ];

  findAll(filter?: UserFilterDto): UserEntity[] {
    let result = this.users.filter(user => user.isActive);

    if (filter) {
      if (filter.name) {
        result = result.filter(user => 
          user.name.toLowerCase().includes(filter.name!.toLowerCase())
        );
      }
      if (filter.minAge !== undefined && filter.minAge !== null) {
        result = result.filter(user => user.age !== undefined && user.age >= filter.minAge!);
      }
      if (filter.maxAge !== undefined && filter.maxAge !== null) {
        result = result.filter(user => user.age !== undefined && user.age <= filter.maxAge!);
      }
      if (filter.isActive !== undefined) {
        result = result.filter(user => user.isActive === filter.isActive);
      }
    }

    return result;
  }

  findOne(id: string): UserEntity {
    const user = this.users.find(user => user.id === id && user.isActive);
    if (!user) {
      throw new NotFoundException(`משתמש עם מזהה ${id} לא נמצא`);
    }
    return user;
  }

  create(createUserInput: CreateUserInputDto): UserEntity {
    // בדיקה שהאימייל לא קיים
    const existingUser = this.users.find(user => user.email === createUserInput.email);
    if (existingUser) {
      throw new ConflictException('משתמש עם אימייל זה כבר קיים');
    }

    const newUser = UserMapper.toEntity(createUserInput);
    this.users.push(newUser);
    return newUser;
  }

  update(id: string, updateUserInput: UpdateUserInputDto): UserEntity {
    const user = this.findOne(id);
    
    if (updateUserInput.email && updateUserInput.email !== user.email) {
      const existingUser = this.users.find(u => u.email === updateUserInput.email);
      if (existingUser) {
        throw new ConflictException('משתמש עם אימייל זה כבר קיים');
      }
    }

    Object.assign(user, updateUserInput);
    user.updatedAt = new Date();
    return user;
  }

  remove(id: string): boolean {
    const user = this.findOne(id);
    user.isActive = false;
    user.updatedAt = new Date();
    return true;
  }
}