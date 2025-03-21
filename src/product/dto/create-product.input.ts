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
  shopId: string;

  @Field()
  sellerSku: string;

  @Field()
  barcode: string;

  @Field()
  variantId: string;

  @Field()
  brandId: string;

  @Field()
  categoryId: string;

  @Field()
  price: number;

  @Field()
  stock: string;
}
