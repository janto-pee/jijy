import { ObjectType, Field } from '@nestjs/graphql';
import {
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { User } from 'src/user/entities/user.entity';

@Table
@ObjectType()
export class Address extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column
  @Field()
  street: string;

  @Column
  @Field()
  street2: string;

  @Column
  @Field()
  city: string;

  @Column
  @Field()
  state_province_code: string;

  @Column
  @Field()
  state_province_name: string;

  @Column
  @Field()
  postal_code: string;

  @Column
  @Field()
  country_code: string;

  @Column
  @Field()
  location: string;

  @Column
  @Field()
  country: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  // @BelongsTo(() => User)
  // user: User;

  // @ForeignKey(() => User)
  // @Column
  // userId: string;
}
