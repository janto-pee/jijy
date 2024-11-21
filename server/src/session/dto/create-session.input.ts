import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateSessionInput {
  @Field()
  userAgent: string;

  @Field()
  valid: boolean;
}
