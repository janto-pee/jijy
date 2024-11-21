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
export class Customer extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  photoURL: string;

  @Column
  username: string;

  @Column
  title: string;

  @Column
  department: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
