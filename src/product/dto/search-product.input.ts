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
export class SearchProductInput {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  term?: string;

  @Field(() => String, { nullable: true })
  @IsUUID()
  @IsOptional()
  categoryId?: string;

  @Field(() => String, { nullable: true })
  @IsUUID()
  @IsOptional()
  brandId?: string;

  @Field(() => Float, { nullable: true })
  @IsNumber()
  @Min(0)
  @IsOptional()
  minPrice?: number;

  @Field(() => Float, { nullable: true })
  @IsNumber()
  @Min(0)
  @IsOptional()
  maxPrice?: number;

  @Field(() => String, { nullable: true })
  @IsUUID()
  @IsOptional()
  shopId?: string;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  inStock?: boolean;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  tags?: string[];

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  sortBy?: 'price' | 'createdAt' | 'name';

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  sortOrder?: 'ASC' | 'DESC';
}
