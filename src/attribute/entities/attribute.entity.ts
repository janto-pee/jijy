import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Product } from 'src/product/entities/product.entity';

@Table
@ObjectType()
export class Attribute extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  @Field(() => ID)
  declare id: string;

  @Column
  @Field()
  name: string;

  @Column
  @Field()
  value: string;

  @Column
  @Field()
  description: string;

  @Column
  @Field()
  type: string;

  @Column
  @Field()
  mandatory: string;

  @Column
  @Field()
  variation: string;

  @Column
  @Field()
  translatable: string;

  @Unique
  @Column(DataType.UUID)
  declare productId: string;

  /**
   * RESOLVERS
   */
  @Field(() => Product)
  product: Product;
}
