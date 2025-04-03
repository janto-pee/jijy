import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsString,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { UserRole } from 'src/user/entities/user.entity';

@InputType()
export class RegisterInput {
  @Field()
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @Field()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Username is required' })
  username: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'First name is required' })
  firstName: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Last name is required' })
  lastName: string;

  @Field(() => UserRole, { nullable: true })
  @IsEnum(UserRole)
  role?: UserRole;
}
