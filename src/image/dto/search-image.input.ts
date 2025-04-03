import { Field, InputType, Float } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

@InputType()
export class SearchImageInput {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  url: string;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  primary: boolean;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  term: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  productId: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  sortBy?: 'createdAt' | 'name';

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  sortOrder?: 'ASC' | 'DESC';
}
