import { Field } from '@nestjs/graphql';

export class CreateImageInput {
  @Field()
  url: string;

  @Field()
  primary: boolean;
}
