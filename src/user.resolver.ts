/* eslint-disable prettier/prettier */
import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ValidationPipe, UsePipes } from '@nestjs/common';
import { UserDto } from './user.model';
import { UserService } from './user.service';
import { CreateUserInputDto, UpdateUserInputDto, UserFilterDto } from './user.input';

@Resolver(() => UserDto)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserDto], { name: 'users' })
  @UsePipes(new ValidationPipe({ transform: true }))
  findAll(@Args('filter', { nullable: true }) filter?: UserFilterDto): UserDto[] {
    const entities = this.userService.findAll(filter);
    return entities.map(entity => ({
      id: entity.id,
      name: entity.name,
      email: entity.email,
      age: entity.age,
      createdAt: entity.createdAt,
      isActive: entity.isActive,
    }));
  }

  @Query(() => UserDto, { name: 'user' })
  findOne(@Args('id', { type: () => ID }) id: string): UserDto {
    const entity = this.userService.findOne(id);
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      age: entity.age,
      createdAt: entity.createdAt,
      isActive: entity.isActive,
    };
  }

  @Mutation(() => UserDto)
  @UsePipes(new ValidationPipe({ transform: true }))
  createUser(@Args('createUserInput') createUserInput: CreateUserInputDto): UserDto {
    const entity = this.userService.create(createUserInput);
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      age: entity.age,
      createdAt: entity.createdAt,
      isActive: entity.isActive,
    };
  }

  @Mutation(() => UserDto)
  @UsePipes(new ValidationPipe({ transform: true }))
  updateUser(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInputDto,
  ): UserDto {
    const entity = this.userService.update(id, updateUserInput);
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      age: entity.age,
      createdAt: entity.createdAt,
      isActive: entity.isActive,
    };
  }

  @Mutation(() => Boolean)
  removeUser(@Args('id', { type: () => ID }) id: string): boolean {
    return this.userService.remove(id);
  }
}