import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateImageInput {
  @Field()
  url: string;

  @Field()
  primary: boolean;

  @Field()
  product: string;

  @Field()
  shopId: string;
}
