import {
  Table,
  Column,
  Model,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
  Default,
  AutoIncrement,
  HasOne,
} from 'sequelize-typescript';
import { User } from 'src/users/entities/user.entity';

@Table
export class Session extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @HasOne(() => User, 'id')
  user: User;

  @Column
  userAgent: string;

  @Default(true)
  @Column
  valid: boolean;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
