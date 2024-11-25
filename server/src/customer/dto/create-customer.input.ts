import { Field } from '@nestjs/graphql';

export class CreateCustomerInput {
  @Field()
  photoURL: string;

  @Field()
  username: string;

  @Field()
  title: string;

  @Field()
  department: string;

  @Field()
  user: number;
}
