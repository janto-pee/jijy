import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class SessionResponse {
  @Field()
  access_token: string;
}
