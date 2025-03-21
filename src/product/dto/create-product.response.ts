import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductRepone {
  @Field()
  declare id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  parentSku: string;

  @Field()
  sellerSku: string;

  @Field()
  barcode: string;

  @Field()
  price: string;

  @Field()
  stock: string;

  @Field()
  declare createdAt: Date;

  @Field()
  declare updatedAt: Date;
}
