import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Shop } from '../entities/shop.entity';

@ObjectType()
export class ShopResponse {
  @Field(() => [Shop])
  items: Shop[];

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
