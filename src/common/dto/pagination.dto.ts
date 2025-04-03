import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, Min } from 'class-validator';

@InputType()
@ArgsType()
export class PaginationArgs {
  @Field(() => Int, {
    defaultValue: 10,
    description: 'Number of items to return',
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  limit: number = 10;

  @Field(() => Int, { defaultValue: 0, description: 'Number of items to skip' })
  @IsInt()
  @Min(0)
  @IsOptional()
  offset: number = 0;
}
