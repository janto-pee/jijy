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
export class Card extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;
  @CreatedAt
  createdAt: Date;

  @Column
  type: string;

  @Column
  name: string;

  @UpdatedAt
  updatedAt: Date;
}
