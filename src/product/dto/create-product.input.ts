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
  variantId: number;

  @Field()
  brandId: number;

  @Field()
  categoryId: number;

  @Field()
  image: number;

  @Field()
  price: string;

  @Field()
  stock: string;
}
