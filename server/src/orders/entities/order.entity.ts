import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  AutoIncrement,
  Default,
  Unique,
  HasOne,
} from 'sequelize-typescript';
import { Product } from 'src/product/entities/product.entity';
import { Shop } from 'src/shops/entities/shop.entity';

@Table
export class Order extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @HasOne(() => Shop, 'id')
  shop: Shop;

  @Column
  businessClientCode: string;

  @Column
  shippingDate: string;

  @Column
  comment: string;

  @HasOne(() => Product, 'id')
  product: Product;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
