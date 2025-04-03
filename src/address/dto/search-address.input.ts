import { Field, InputType, Float } from '@nestjs/graphql';
import {
  IsOptional,
  IsString,
  IsUUID,
  Min,
  Max,
  IsNumber,
} from 'class-validator';

@InputType()
export class SearchAddressInput {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  name: string;

  @Field()
  @IsString()
  @IsOptional()
  street: string;

  @Field()
  @IsString()
  @IsOptional()
  city: string;

  @Field()
  @IsString()
  @IsOptional()
  state_province_code: string;

  @Field()
  @IsString()
  @IsOptional()
  state_province_name: string;

  @Field()
  @IsString()
  @IsOptional()
  country_code: string;

  @Field()
  @IsString()
  @IsOptional()
  country: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  sortBy?: 'price' | 'createdAt' | 'name';

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  sortOrder?: 'ASC' | 'DESC';
}
