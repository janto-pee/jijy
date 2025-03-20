import { Field, ObjectType } from '@nestjs/graphql';
import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  AutoIncrement,
  HasOne,
  Default,
  DataType,
  NotNull,
} from 'sequelize-typescript';
import { Product } from 'src/product/entities/product.entity';
import { Shop } from 'src/shop/entities/shop.entity';
// import { Product } from 'src/product/entities/product.entity';
// import { Shop } from 'src/shop/entities/shop.entity';

@Table
@ObjectType()
export class Order extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
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

  // @HasOne(() => Product, 'id')
  // product: Product;

  // @NotNull
  @Column(DataType.UUID)
  declare shopId: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
