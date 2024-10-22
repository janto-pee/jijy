import { DataTypes } from 'sequelize';
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  Default,
  CreatedAt,
  UpdatedAt,
  BeforeCreate,
  BeforeUpdate,
} from 'sequelize-typescript';

@Table
export class User extends Model {
  @PrimaryKey
  @Column
  id: string;

  @Column
  username: string;

  @Column
  first_name: string;

  @Column
  hashed_password: string;
}
