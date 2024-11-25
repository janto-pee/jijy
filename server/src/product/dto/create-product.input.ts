import { Field } from '@nestjs/graphql';

export class CreateProductInput {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  parentSku: string;

  @Field()
  shop: number;

  @Field()
  sellerSku: string;

  @Field()
  barcode: string;

  @Field()
  variant: number;

  @Field()
  brand: number;

  @Field()
  category: number;

  @Field()
  image: number;

  @Field()
  price: string;

  @Field()
  stock: string;

  @Field()
  attribute: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
