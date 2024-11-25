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
import { Attribute } from 'src/attributes/entities/attribute.entity';
import { Category } from 'src/category/entities/category.entity';
import { Image } from 'src/images/entities/image.entity';
import { Variant } from 'src/variants/entities/variant.entity';

@Table
export class Product extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @Column
  description: string;

  @Column
  parentSku: string;

  @Column
  sellerSku: string;

  @Column
  barcodeEan: string;

  @HasOne(() => Variant, 'id')
  variant: Variant;

  @Column
  brand: string;

  @HasOne(() => Category, 'id')
  category: Category;

  @HasOne(() => Image, 'id')
  image: Image;

  @Column
  price: string;

  @Column
  stock: string;

  @HasOne(() => Attribute, 'id')
  attribute: Attribute;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
