import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Tag } from '../entities/tag.entity';

@ObjectType()
export class TagResponse {
  @Field(() => [Tag])
  items: Tag[];

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
