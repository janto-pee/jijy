import { ObjectType, Field } from '@nestjs/graphql';
import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  Default,
  ForeignKey,
  Model,
  NotNull,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';
import { User } from 'src/user/entities/user.entity';

@Table
@ObjectType()
export class Address extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  // @Field(() => ID)
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

  // @NotNull
  @Unique
  @Column(DataType.UUID)
  declare userId: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  /**
   * RESOLVERS
   */
  @Field(() => User)
  user: User;
}
