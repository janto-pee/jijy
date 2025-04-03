import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class SessionProfile {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;
}
