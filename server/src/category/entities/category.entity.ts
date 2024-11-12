import {
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  Table,
} from 'sequelize-typescript';

@Table
export class Category extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  code: number;

  @Column
  name: String;

  @Column
  description: String;
}
