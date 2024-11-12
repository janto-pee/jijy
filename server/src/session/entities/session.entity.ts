import {
  Table,
  Column,
  Model,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
  Default,
  AutoIncrement,
} from 'sequelize-typescript';

@Table
export class Session extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  userId: string;

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
