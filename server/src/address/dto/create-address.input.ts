import { Field } from '@nestjs/graphql';

export class CreateAddressInput {
  @Field()
  userId: number;

  @Field()
  street: string;

  @Field()
  street2: string;

  @Field()
  city: string;

  @Field()
  state_province_code: string;

  @Field()
  state_province_name: string;

  @Field()
  postal_code: string;

  @Field()
  country_code: string;

  @Field()
  location: string;

  @Field()
  country: string;
}
