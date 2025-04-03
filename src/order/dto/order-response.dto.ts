import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Order } from '../entities/order.entity';

@ObjectType()
export class OrderResponse {
  @Field(() => [Order])
  items: Order[];

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
