import { ObjectType, Field, ID } from '@nestjs/graphql';
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
  HasMany,
  BelongsToMany,
  HasOne,
} from 'sequelize-typescript';
import { Brand } from 'src/brand/entities/brand.entity';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';

@Table
@ObjectType()
export class Shop extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  @Field(() => ID)
  declare id: string;

  @Column
  @Field()
  name: string;

  @Column
  @Field()
  email: string;

  @HasMany(() => Order, /* foreign key */ 'shopId')
  declare orders?: NonAttribute<Order[]>;

  @HasMany(() => Product, /* foreign key */ 'shopId')
  declare products?: NonAttribute<Product[]>;

  @HasOne(() => User, /* foreign key */ 'userId')
  declare user: NonAttribute<User>;

  @CreatedAt
  @Field()
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
