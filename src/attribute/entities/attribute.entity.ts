import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Model, Table } from 'sequelize-typescript';

@Table
@ObjectType()
export class Attribute extends Model {
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
