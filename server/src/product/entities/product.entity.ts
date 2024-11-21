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
export class Product extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @Column
  description: string;

  @Column
  parentSku: string;

  @Column
  sellerSku: string;

  @Column
  barcodeEan: string;

  @Column
  variation: string;

  @Column
  brand: string;

  @Column
  category: string;

  @Column
  images: string;

  @Column
  price: string;

  @Column
  stock: string;

  @Column
  attributes: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
