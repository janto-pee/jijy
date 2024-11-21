import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

@Table
export class Sale extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  amount: number;

  @Column
  quantity: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
