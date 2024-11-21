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
} from 'sequelize-typescript';

@Table
export class Order extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  shopId: string;

  @Column
  businessClientCode: string;

  @Column
  shippingDate: string;

  @Column
  comment: string;

  @Column
  products: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
