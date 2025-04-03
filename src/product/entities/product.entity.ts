import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql';
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
  BelongsTo,
  ForeignKey,
  AllowNull,
  Index,
} from 'sequelize-typescript';
import { Attribute } from 'src/attribute/entities/attribute.entity';
import { Brand } from 'src/brand/entities/brand.entity';
import { Category } from 'src/category/entities/category.entity';
import { Image } from 'src/image/entities/image.entity';
import { Shop } from 'src/shop/entities/shop.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { Variant } from 'src/variant/entities/variant.entity';

@Table({
  timestamps: true,
  paranoid: true, // Adds deletedAt for soft deletes
})
@ObjectType()
export class Product extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  @Field(() => ID)
  declare id: string;

  @AllowNull(false)
  @Index
  @Column
  @Field()
  name: string;

  @Column(DataType.TEXT)
  @Field()
  description: string;

  @AllowNull(false)
  @Index
  @Column
  @Field()
  parentSku: string;

  @AllowNull(false)
  @Index
  @Column
  @Field()
  sellerSku: string;

  @Column
  @Field({ nullable: true })
  barcode?: string;

  @AllowNull(false)
  @Column(DataType.DECIMAL(10, 2))
  @Field(() => Float)
  price: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  @Field(() => Int)
  stock: number;

  @HasOne(() => Attribute, 'productId')
  declare attribute?: NonAttribute<Attribute>;

  @ForeignKey(() => Category)
  @AllowNull(false)
  @Column(DataType.UUID)
  declare categoryId: string;

  @BelongsTo(() => Category)
  declare category: NonAttribute<Category>;

  @ForeignKey(() => Variant)
  @AllowNull(false)
  @Column(DataType.UUID)
  declare variantId: string;

  @BelongsTo(() => Variant)
  declare variant: NonAttribute<Variant>;

  @HasMany(() => Image, 'productId')
  declare images?: NonAttribute<Image[]>;

  @ForeignKey(() => Shop)
  @AllowNull(false)
  @Column(DataType.UUID)
  declare shopId: string;

  @BelongsTo(() => Shop)
  declare shopRelation: NonAttribute<Shop>;

  @ForeignKey(() => Brand)
  @AllowNull(false)
  @Column(DataType.UUID)
  declare brandId: string;

  @HasMany(() => Tag, 'productId')
  declare tags?: NonAttribute<Tag[]>;

  @Default(true)
  @Column(DataType.BOOLEAN)
  @Field(() => Boolean)
  isActive: boolean;

  @CreatedAt
  @Field()
  declare createdAt: Date;

  @UpdatedAt
  @Field()
  declare updatedAt: Date;

  @Column(DataType.DATE)
  @Field({ nullable: true })
  declare deletedAt?: Date;

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
  shop: Shop;

  @Field(() => Brand)
  brands: Brand;

  @Field(() => [Tag])
  tag: Tag[];
}

// import { ObjectType, Field, ID } from '@nestjs/graphql';
// import { NonAttribute } from 'sequelize';
// import {
//   Table,
//   Column,
//   Model,
//   CreatedAt,
//   UpdatedAt,
//   PrimaryKey,
//   DataType,
//   Default,
//   HasOne,
//   HasMany,
// } from 'sequelize-typescript';
// import { Attribute } from 'src/attribute/entities/attribute.entity';
// import { Brand } from 'src/brand/entities/brand.entity';
// import { Category } from 'src/category/entities/category.entity';
// import { Image } from 'src/image/entities/image.entity';
// import { Shop } from 'src/shop/entities/shop.entity';
// import { Tag } from 'src/tag/entities/tag.entity';
// import { Variant } from 'src/variant/entities/variant.entity';

// @Table
// @ObjectType()
// export class Product extends Model {
//   @PrimaryKey
//   @Default(DataType.UUIDV4)
//   @Column(DataType.UUID)
//   @Field(() => ID)
//   declare id: string;

//   @Column
//   @Field()
//   name: string;

//   @Column
//   @Field()
//   description: string;

//   @Column
//   @Field()
//   parentSku: string;

//   @Column
//   @Field()
//   sellerSku: string;

//   @Column
//   @Field()
//   barcode: string;

//   // @HasOne(() => Variant, 'id')
//   // variant: Variant;

//   // @HasOne(() => Shop, 'id')
//   // shop: Shop;

//   // @HasOne(() => Brand, 'id')
//   // brand: Brand;

//   // @HasOne(() => Category, 'id')
//   // category: Category;

//   @Column
//   @Field()
//   price: string;

//   @Column
//   @Field()
//   stock: string;

//   @HasOne(() => Attribute, 'productId')
//   declare attribute?: NonAttribute<Attribute>;

//   // @NotNull
//   @Column(DataType.UUID)
//   declare categoryId: string;

//   // @NotNull
//   @Column(DataType.UUID)
//   declare variantId: string;

//   @HasMany(() => Image, /* foreign key */ 'imageId')
//   declare images?: NonAttribute<Image[]>;

//   // @NotNull
//   @Column(DataType.UUID)
//   declare shopId: string;

//   // @NotNull
//   @Column(DataType.UUID)
//   declare brandId: string;

//   @HasMany(() => Tag, /* foreign key */ 'productId')
//   declare tags?: NonAttribute<Product[]>;

//   @CreatedAt
//   @Field()
//   declare createdAt: Date;

//   @UpdatedAt
//   declare updatedAt: Date;

//   /**
//    * RESOLVERS
//    */
//   @Field(() => Attribute)
//   attributes: Attribute;

//   @Field(() => Category)
//   categorys: Category;

//   @Field(() => Variant)
//   variants: Variant;

//   @Field(() => [Image])
//   image: Image[];

//   @Field(() => Shop)
//   shop: Shop;

//   @Field(() => Brand)
//   brands: Brand;

//   @Field(() => [Tag])
//   tag: Tag[];
// }
