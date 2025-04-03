import { InputType, Field } from '@nestjs/graphql';
import { UserRole } from '../entities/user.entity';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field(() => UserRole)
  @IsEnum(UserRole)
  role: UserRole;
}
