import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  Table,
  Default,
  DataType,
} from 'sequelize-typescript';

@Table
@ObjectType()
export class Category extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column
  @Field()
  code: number;

  @Column
  @Field()
  name: string;

  @Column
  @Field()
  description: string;

  // @HasMany(() => Product, /* foreign key */ 'id')
  // Products?: Product[];
}
