import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Image } from '../entities/image.entity';

@ObjectType()
export class ImageResponse {
  @Field(() => [Image])
  items: Image[];

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
