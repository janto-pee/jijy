import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import {
  Column,
  CreatedAt,
  DataType,
  Default,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
  Model,
  HasOne,
  HasMany,
} from 'sequelize-typescript';
import { customAlphabet } from 'nanoid';
import { Address } from 'src/address/entities/address.entity';
import { NonAttribute } from 'sequelize';
import { Product } from 'src/product/entities/product.entity';
import { Shop } from 'src/shop/entities/shop.entity';
const nanoid = customAlphabet('0123456789abcdefghi', 6);

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  SELLER = 'SELLER',
}

registerEnumType(UserRole, {
  name: 'UserRole',
  description: 'User role types',
});

@Table
@ObjectType()
export class User extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  @Field(() => ID)
  declare id: string;

  @Unique
  @Column
  @Field()
  username: string;

  @Unique
  @Column
  @Field()
  email: string;

  @Column
  password: string;

  @Column
  @Field()
  firstName: string;

  @Column
  @Field()
  lastName: string;

  @Default(nanoid())
  @Column
  verificationCode: string;

  @Default(null)
  @Column
  passwordResetCode: string;

  @Default(false)
  @Column
  is_email_verified: boolean;

  @HasOne(() => Address, /* foreign key */ 'userId')
  declare address?: NonAttribute<Address>;

  @Field(() => Address)
  addresses: Address;

  @Default({ default: UserRole.USER, enum: UserRole, type: String })
  @Column
  @Field(() => UserRole)
  role: UserRole;

  @Default({ default: [] })
  @Column
  @Field(() => [String], { nullable: true })
  roles: string[];

  @Default({ default: true })
  @Column
  @Field()
  isActive: boolean;

  @Default(null)
  @Column
  @Field({ nullable: true })
  profile_picture: string;

  @Default(null)
  @Column
  @Field({ nullable: true })
  bio: string;

  @Default([])
  @Column
  @Field(() => [String], { nullable: true })
  interests: string[];

  // @HasMany(() => Product, /* foreign key */ 'productId')
  // declare products?: NonAttribute<Product[]>;

  @Default({ default: null })
  @Column
  @Field({ nullable: true })
  last_login: Date;

  @Unique
  @Column(DataType.UUID)
  @Column
  @Field({ nullable: true })
  shopId?: string;

  @Field()
  fullName: string;

  @CreatedAt
  @Field()
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
