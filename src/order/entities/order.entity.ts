import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  Default,
  DataType,
} from 'sequelize-typescript';
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

  @Column
  @Field()
  shopId: string;

  // @HasOne(() => Product, 'id')
  // product: Product;

  // // @NotNull
  // @Column(DataType.UUID)
  // declare shopId: string;

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
}
