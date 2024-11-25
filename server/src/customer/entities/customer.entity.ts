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
export class Customer extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @HasOne(() => User, 'id')
  user: User;

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
