import { ObjectType, Field, ID } from '@nestjs/graphql';
import { NonAttribute } from 'sequelize';
import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  Default,
  DataType,
  HasOne,
  HasMany,
} from 'sequelize-typescript';
import { Product } from 'src/product/entities/product.entity';
import { Shop } from 'src/shop/entities/shop.entity';

@Table
@ObjectType()
export class Order extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  @Field(() => ID)
  declare id: string;

  @Column
  @Field()
  businessClientCode: string;

  @Column
  @Field()
  shippingDate: string;

  @Column
  @Field()
  comment: string;

  @Column(DataType.UUID)
  @Field()
  shopId: string;

  @HasMany(() => Product, /* foreign key */ 'brandId')
  declare product: NonAttribute<Product[]>;

  @CreatedAt
  @Field()
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  /**
   * RESOLVERS
   */
  @Field(() => Shop)
  shop: Shop;

  @Field(() => [Product])
  products: Product[];
}
