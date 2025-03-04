import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Storedetail {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
