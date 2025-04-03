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
  HasMany,
  BelongsToMany,
  ForeignKey,
  AllowNull,
} from 'sequelize-typescript';
import { Product } from 'src/product/entities/product.entity';
import { Shop } from 'src/shop/entities/shop.entity';

@Table
@ObjectType()
export class Brand extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  @Field(() => ID)
  declare id: string;

  @Column
  @Field()
  code: number;

  @Column
  @Field()
  name: string;

  @HasMany(() => Product, /* foreign key */ 'brandId')
  declare product?: NonAttribute<Product[]>;

  @CreatedAt
  @Field()
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  @ForeignKey(() => Shop)
  @AllowNull(false)
  @Column(DataType.UUID)
  declare shopId: string;

  /**
   * RESOLVERS
   */
  @Field(() => [Product])
  products: Product[];
}
