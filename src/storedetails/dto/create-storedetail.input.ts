import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateStoredetailInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
