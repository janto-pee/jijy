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
export class Tag extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: String;

  @Column
  icon: String;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
