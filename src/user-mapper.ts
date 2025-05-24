/* eslint-disable prettier/prettier */
import { UserEntity } from "./user.entity";
import { CreateUserInputDto } from "./user.input";
import { UserDto } from "./user.model";

export class UserMapper {
  static toDto(entity: UserEntity): UserDto {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      age: entity.age,
      createdAt: entity.createdAt,
      isActive: entity.isActive,
    };
  }

  static toDtoArray(entities: UserEntity[]): UserDto[] {
    return entities.map(entity => this.toDto(entity));
  }

  static toEntity(createDto: CreateUserInputDto): UserEntity {
    return new UserEntity({
      id: Math.random().toString(36).substr(2, 9), // זמני
      name: createDto.name,
      email: createDto.email,
      age: createDto.age,
    });
  }
}