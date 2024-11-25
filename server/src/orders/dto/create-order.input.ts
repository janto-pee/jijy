import { Field } from '@nestjs/graphql';

export class CreateOrderInput {
  @Field()
  shop: number;

  @Field()
  businessClientCode: string;

  @Field()
  shippingDate: string;

  @Field()
  comment: string;

  @Field()
  product: number;
}
