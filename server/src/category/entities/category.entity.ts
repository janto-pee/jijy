import {
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  Table,
  HasMany,
} from 'sequelize-typescript';
import { Product } from 'src/product/entities/product.entity';

@Table
export class Category extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  code: number;

  @Column
  name: string;

  @Column
  description: string;

  // @HasMany(() => Product, /* foreign key */ 'id')
  // Products?: Product[];
}
