import { Field } from '@nestjs/graphql';

export class CreateCategoryInput {
  @Field()
  code: string;

  @Field()
  name: string;

  @Field()
  description: string;
}
