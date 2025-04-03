import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateImageInput {
  @Field()
  url: string;

  @Field()
  primary: boolean;

  @Field()
  productId: string;

  @Field()
  shopId: string;
}
