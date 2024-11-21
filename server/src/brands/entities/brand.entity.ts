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
export class Brand extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  code: number;

  @Column
  name: String;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
