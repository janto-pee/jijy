import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreatedAt,
  DataType,
  Default,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
  Model,
} from 'sequelize-typescript';
import { customAlphabet } from 'nanoid';
const nanoid = customAlphabet('0123456789abcdefghi', 6);

@Table
@ObjectType()
export class User extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Unique
  @Column
  @Field()
  username: string;

  @Unique
  @Column
  @Field()
  email: string;

  @Column
  AddressId: number;

  @Column
  @Field()
  password: string;

  @Column
  @Field()
  first_name: string;

  @Column
  @Field()
  last_name: string;

  @Default(nanoid())
  @Column
  verificationCode: string;

  @Default(null)
  @Column
  passwordResetCode: string;

  @Default(false)
  @Column
  is_email_verified: boolean;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
