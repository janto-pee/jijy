import { Field } from '@nestjs/graphql';

export class CreateReviewInput {
  @Field()
  customer: number;

  @Field()
  product: number;

  @Field()
  payment: number;

  @Field()
  ratings: number;

  @Field()
  reviewText: string;
}
