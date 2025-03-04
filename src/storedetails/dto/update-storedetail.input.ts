import { CreateStoredetailInput } from './create-storedetail.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateStoredetailInput extends PartialType(CreateStoredetailInput) {
  @Field(() => Int)
  id: number;
}
