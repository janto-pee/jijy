import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateSessionInput {
  @Field()
  userId: number;

  @Field()
  userAgent: string;

  @Field()
  valid: boolean;
  // @Field()
  // email: string;

  // @Field()
  // password: string;
}
