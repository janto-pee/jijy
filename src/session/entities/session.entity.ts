import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Model } from 'sequelize';
import {
  Column,
  CreatedAt,
  DataType,
  Default,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table
@ObjectType()
export class Session extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column
  @Field()
  userAgent: string;

  @Default(true)
  @Column
  @Field()
  valid: boolean;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
