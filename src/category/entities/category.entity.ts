import { ObjectType, Field, ID } from '@nestjs/graphql';
import { NonAttribute } from 'sequelize';
import {
  Column,
  Model,
  PrimaryKey,
  Table,
  Default,
  DataType,
  HasMany,
  Unique,
} from 'sequelize-typescript';
import { Product } from 'src/product/entities/product.entity';

@Table
@ObjectType()
export class Category extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  @Field(() => ID)
  declare id: string;

  @Unique
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

  /**
   * RESOLVERS
   */
  @Field(() => [Product])
  product: Product[];
}
