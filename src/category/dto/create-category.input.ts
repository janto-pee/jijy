import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {
  @Field()
  code: number;

  @Field()
  name: string;

  @Field()
  description: string;
}
