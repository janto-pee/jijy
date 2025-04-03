import { Field, ObjectType, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class RefreshTokenInput {
  @Field()
  @IsNotEmpty({ message: 'Refresh token is required' })
  token: string;
}

@ObjectType()
export class RefreshTokenResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;

  @Field()
  accessToken: string;
}
