import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  AutoIncrement,
  Default,
  Unique,
} from 'sequelize-typescript';
import { customAlphabet } from 'nanoid';
const nanoid = customAlphabet('0123456789abcdefghi', 6);
@Table
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Unique
  @Column
  username: string;

  @Unique
  @Column
  email: string;

  @Column
  password: string;

  @Column
  first_name: string;

  @Column
  last_name: string;

  @Default(nanoid())
  @Column
  verificationCode: string;

  @Column
  passwordResetCode: string;

  @Default(false)
  @Column
  is_email_verified: boolean;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
