import { ObjectType, Field, ID } from '@nestjs/graphql';
import { NonAttribute } from 'sequelize';

import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  DataType,
  Default,
  BelongsTo,
  ForeignKey,
  Unique,
  HasMany,
} from 'sequelize-typescript';
import { Product } from 'src/product/entities/product.entity';

@Table
@ObjectType()
export class Image extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  @Field(() => ID)
  declare id: string;

  @Column
  @Field()
  url: string;

  @Default(false)
  @Column
  @Field()
  primary: boolean;

  @Column
  @Field()
  userId: string;

  @Column(DataType.UUID)
  declare productId: string;

  @CreatedAt
  @Field()
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
