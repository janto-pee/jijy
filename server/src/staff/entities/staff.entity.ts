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
export class Staff extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  photoURL: String;

  @Column
  username: String;

  @Column
  title: String;

  @Column
  department: String;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
