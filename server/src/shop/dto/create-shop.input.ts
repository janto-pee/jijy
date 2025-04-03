import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateShopInput {
  @Field()
  name: string;

  @Field()
  email: string;
}
