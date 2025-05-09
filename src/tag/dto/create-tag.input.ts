import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTagInput {
  @Field()
  name: string;

  @Field()
  icon: string;

  @Field()
  productId: string;
}
