import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

@Table
export class Attribute extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  // @HasMany(() => Product, 'id')
  // product: Product;

  @Column
  value: string;

  @Column
  description: string;

  @Column
  type: string;

  @Column
  mandatory: string;

  @Column
  variation: string;

  @Column
  translatable: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
