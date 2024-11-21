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
export class Review extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  reviewer: string;

  @Column
  course: string;

  @Column
  enrollmmentId: number;

  @Column
  ratings: number;

  @Column
  reviewText: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
