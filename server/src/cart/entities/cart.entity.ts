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
export class Cart extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;
  @CreatedAt
  createdAt: Date;

  @Column
  quantity: number;

  @Column
  product: string;

  @UpdatedAt
  updatedAt: Date;
}
