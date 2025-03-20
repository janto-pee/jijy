import { Field, ObjectType } from '@nestjs/graphql';
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
  HasMany,
} from 'sequelize-typescript';
import { Product } from 'src/product/entities/product.entity';

@Table
@ObjectType()
export class Variant extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column
  @Field()
  name: string;

  @Column
  @Field()
  icon: string;

  @HasMany(() => Product, /* foreign key */ 'varintId')
  declare products?: NonAttribute<Product[]>;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
