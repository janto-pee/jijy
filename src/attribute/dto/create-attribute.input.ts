import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAttributeInput {
  @Field()
  name: string;

  @Field()
  value: string;

  @Field()
  description: string;

  @Field()
  type: string;

  @Field()
  mandatory: string;

  @Field()
  variation: string;

  @Field()
  translatable: string;

  @Field()
  productId: string;
}
