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
  HasMany,
  HasOne,
} from 'sequelize-typescript';
import { Customer } from 'src/customer/entities/customer.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import { Product } from 'src/product/entities/product.entity';

@Table
export class Review extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  // @HasMany(() => Customer, /* foreign key */ 'id')
  // customer: Customer[]

  @HasOne(() => Customer, 'id')
  customer: Customer;

  @HasOne(() => Product, 'id')
  product: Product;

  @Column
  course: string;

  @HasOne(() => Payment, 'id')
  payment: Payment;

  @Column
  ratings: number;

  @Column
  reviewText: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
