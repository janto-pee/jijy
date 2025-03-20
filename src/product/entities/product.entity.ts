import { Field, ObjectType } from '@nestjs/graphql';
import { NonAttribute } from 'sequelize';
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
  HasMany,
} from 'sequelize-typescript';
import { Attribute } from 'src/attribute/entities/attribute.entity';
import { Brand } from 'src/brand/entities/brand.entity';
import { Category } from 'src/category/entities/category.entity';
import { Image } from 'src/image/entities/image.entity';
import { Shop } from 'src/shop/entities/shop.entity';
import { Tag } from 'src/tag/entities/tag.entity';
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

  // @HasOne(() => Variant, 'id')
  // variant: Variant;

  // @HasOne(() => Shop, 'id')
  // shop: Shop;

  // @HasOne(() => Brand, 'id')
  // brand: Brand;

  // @HasOne(() => Category, 'id')
  // category: Category;

  @Column
  @Field()
  price: string;

  @Column
  @Field()
  stock: string;

  @HasOne(() => Attribute, 'productId')
  declare attribute?: NonAttribute<Attribute>;

  // @NotNull
  @Column(DataType.UUID)
  declare categoryId: string;

  // @NotNull
  @Column(DataType.UUID)
  declare variantId: string;

  @HasMany(() => Image, /* foreign key */ 'imageId')
  declare images?: NonAttribute<Image[]>;

  // @NotNull
  @Column(DataType.UUID)
  declare shopId: string;

  // @NotNull
  @Column(DataType.UUID)
  declare brandId: string;

  @HasMany(() => Tag, /* foreign key */ 'productId')
  declare tags?: NonAttribute<Product[]>;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  /**
   * RESOLVERS
   */
  @Field(() => Attribute)
  attributes: Attribute;

  @Field(() => Category)
  categorys: Category;

  @Field(() => Variant)
  variants: Variant;

  @Field(() => [Image])
  image: Image[];

  @Field(() => Shop)
  Shops: Shop;

  @Field(() => Brand)
  brands: Brand;

  @Field(() => [Tag])
  tag: Tag[];
}
