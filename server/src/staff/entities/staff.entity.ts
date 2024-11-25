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
  HasOne,
} from 'sequelize-typescript';
import { User } from 'src/users/entities/user.entity';

@Table
export class Staff extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @HasOne(() => User, 'id')
  user: User;

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
