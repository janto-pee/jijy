import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  parentSku: string;

  @Field()
  shop: string;

  @Field()
  sellerSku: string;

  @Field()
  barcode: string;

  // @Field()
  // variant: number;

  // @Field()
  // brand: number;

  // @Field()
  // category: number;

  // @Field()
  // image: number;

  @Field()
  price: string;

  @Field()
  stock: string;
}
