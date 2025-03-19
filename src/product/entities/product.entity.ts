import { Field, ObjectType } from '@nestjs/graphql';
import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  DataType,
  Default,
  HasOne,
} from 'sequelize-typescript';
import { Attribute } from 'src/attribute/entities/attribute.entity';
import { Brand } from 'src/brand/entities/brand.entity';
import { Category } from 'src/category/entities/category.entity';
import { Image } from 'src/image/entities/image.entity';
import { Shop } from 'src/shop/entities/shop.entity';
import { Variant } from 'src/variant/entities/variant.entity';

@Table
@ObjectType()
export class Product extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column
  @Field()
  name: string;

  @Column
  @Field()
  description: string;

  @Column
  @Field()
  parentSku: string;

  @Column
  @Field()
  sellerSku: string;

  @Column
  @Field()
  barcode: string;

  @HasOne(() => Variant, 'id')
  variant: Variant;

  @HasOne(() => Shop, 'id')
  shop: Shop;

  @HasOne(() => Brand, 'id')
  brand: Brand;

  @HasOne(() => Category, 'id')
  category: Category;

  @HasOne(() => Image, 'id')
  image: Image;

  @Column
  @Field()
  price: string;

  @Column
  @Field()
  stock: string;

  @HasOne(() => Attribute, 'id')
  attribute: Attribute;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
