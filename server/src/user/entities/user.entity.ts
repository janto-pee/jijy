import { ObjectType, Field, ID } from '@nestjs/graphql';
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
  HasOne,
} from 'sequelize-typescript';
import { customAlphabet } from 'nanoid';
import { Address } from 'src/address/entities/address.entity';
import { NonAttribute } from 'sequelize';
const nanoid = customAlphabet('0123456789abcdefghi', 6);

@Table
@ObjectType()
export class User extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  @Field(() => ID)
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

  @HasOne(() => Address, /* foreign key */ 'userId')
  declare address?: NonAttribute<Address>;

  @Field(() => Address)
  addresses: Address;

  @CreatedAt
  @Field()
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
