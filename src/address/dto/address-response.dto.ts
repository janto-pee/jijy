import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Address } from '../entities/address.entity';

@ObjectType()
export class AddressResponse {
  @Field(() => [Address])
  items: Address[];

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
