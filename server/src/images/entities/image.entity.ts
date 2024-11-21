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
export class Image extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  url: string;

  @Column
  primary: boolean;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
