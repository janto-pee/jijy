import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class ForgotPasswordUserDto extends PartialType(CreateUserDto) {}
