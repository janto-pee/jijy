import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
@ObjectType()
export class Attribute extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column
  @Field()
  name: string;

  @Column
  @Field()
  value: string;

  @Column
  @Field()
  description: string;

  @Column
  @Field()
  type: string;

  @Column
  @Field()
  mandatory: string;

  @Column
  @Field()
  variation: string;

  @Column
  @Field()
  translatable: string;
}
