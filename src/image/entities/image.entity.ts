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
export class Image extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column
  @Field()
  url: string;

  @Default(false)
  @Column
  @Field()
  primary: boolean;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
