import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Brand } from '../entities/brand.entity';

@ObjectType()
export class BrandResponse {
  @Field(() => [Brand])
  items: Brand[];

  //   @Field(() => Int)
  //   code: number;

  //   @Field(() => Int)
  //   name: string;

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
