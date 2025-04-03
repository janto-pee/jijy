import { Field, InputType, Float } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class SearchShopInput {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  name: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  email: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  sortBy?: 'createdAt' | 'name';

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  sortOrder?: 'ASC' | 'DESC';
}
