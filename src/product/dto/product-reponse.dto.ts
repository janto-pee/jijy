import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from '../entities/product.entity';

@ObjectType()
export class ProductsResponse {
  @Field(() => [Product])
  items: Product[];

  @Field(() => Int)
  totalCount: number;

  @Field(() => Boolean)
  hasMore: boolean;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  pages: number;

  @Field(() => Int)
  limit: number;
}
