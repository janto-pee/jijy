import { CreateSessionInput } from './create-session.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSessionInput extends PartialType(CreateSessionInput) {
  @Field(() => String)
  id: string;
}
