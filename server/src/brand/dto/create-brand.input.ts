import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateBrandInput {
  @Field()
  code: number;

  @Field()
  name: string;
}
