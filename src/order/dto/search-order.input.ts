import { Field, InputType, Float } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class SearchOrderInput {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  shippingDate: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  term: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  shopId: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  sortBy?: 'createdAt' | 'name';

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  sortOrder?: 'ASC' | 'DESC';
}
