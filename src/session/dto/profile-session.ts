import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class SessionProfile {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  first_name: string;

  @Field()
  last_name: string;
}
