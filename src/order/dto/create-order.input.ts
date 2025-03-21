import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  @Field()
  businessClientCode: string;

  @Field()
  shopId: string;

  @Field()
  shippingDate: string;

  @Field()
  comment: string;
}
