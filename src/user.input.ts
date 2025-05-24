/* eslint-disable prettier/prettier */
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, Min, Max, Length } from 'class-validator';
import { Transform } from 'class-transformer';

@InputType()
export class CreateUserInputDto {
  @Field()
  @IsNotEmpty({ message: 'השם הוא שדה חובה' })
  @Length(2, 50, { message: 'השם צריך להיות בין 2 ל-50 תווים' })
  @Transform(({ value }) => value?.trim())
  name: string;

  @Field()
  @IsEmail({}, { message: 'כתובת האימייל לא תקינה' })
  @Transform(({ value }) => value?.toLowerCase().trim())
  email: string;

  @Field({ nullable: true })
  @IsOptional()
  @Min(0, { message: 'הגיל לא יכול להיות שלילי' })
  @Max(120, { message: 'הגיל לא יכול להיות מעל 120' })
  age?: number;
}

@InputType()
export class UpdateUserInputDto extends PartialType(CreateUserInputDto) {}

@InputType()
export class UserFilterDto {
  @Field({ nullable: true })
  @IsOptional()
  @Length(1, 50)
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @Min(0)
  minAge?: number;

  @Field({ nullable: true })
  @IsOptional()
  @Max(120)
  maxAge?: number;

  @Field({ nullable: true })
  @IsOptional()
  isActive?: boolean;
}