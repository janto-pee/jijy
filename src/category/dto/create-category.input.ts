import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {
  @Field()
  code: string;

  @Field()
  name: string;

  @Field()
  description: string;
}
