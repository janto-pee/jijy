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
export class Coupon extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  code: string;

  @Column
  couponDescription: string;

  @Column
  couponValue: string;

  @Column
  startDate: string;

  @Column
  endDate: string;

  @Column
  name: string;

  @Column
  description: string;
}
