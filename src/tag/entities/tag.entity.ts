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
export class Tag extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column
  @Field()
  name: string;

  @Column
  @Field()
  icon: string;

  // @NotNull
  @Column(DataType.UUID)
  declare productId: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
