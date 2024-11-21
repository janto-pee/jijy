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
export class Shop extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: String;

  @Column
  email: String;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
