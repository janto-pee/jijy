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
export class SearchBrandInput {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  name: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  sortBy?: 'price' | 'createdAt' | 'name';

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  sortOrder?: 'ASC' | 'DESC';
}
