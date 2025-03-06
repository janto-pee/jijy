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
} from 'sequelize-typescript';

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

  // @HasOne(() => Variant, 'id')
  // variant: Variant;

  // @HasOne(() => Shop, 'id')
  // shop: Shop;

  // @HasOne(() => Brand, 'id')
  // brand: Brand;

  // @HasOne(() => Category, 'id')
  // category: Category;

  // @HasOne(() => Image, 'id')
  // image: Image;

  @Column
  @Field()
  price: string;

  @Column
  @Field()
  stock: string;

  // @HasOne(() => Attribute, 'id')
  // attribute: Attribute;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
