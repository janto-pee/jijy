import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  @Field()
  businessClientCode: string;

  @Field()
  shippingDate: string;

  @Field()
  comment: string;
}
