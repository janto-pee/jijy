import { Field, ObjectType } from '@nestjs/graphql';
import { NonAttribute } from 'sequelize';
import {
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  Table,
  Default,
  DataType,
  HasMany,
} from 'sequelize-typescript';
import { Product } from 'src/product/entities/product.entity';

@Table
@ObjectType()
export class Category extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column
  @Field()
  code: number;

  @Column
  @Field()
  name: string;

  @Column
  @Field()
  description: string;

  @HasMany(() => Product, /* foreign key */ 'categoryId')
  declare products?: NonAttribute<Product[]>;
}
