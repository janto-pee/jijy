import { CreateSessionInput } from './create-session.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateSessionInput extends PartialType(CreateSessionInput) {
  id: number;
}
