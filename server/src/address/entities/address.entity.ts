import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  AutoIncrement,
  Default,
  Unique,
} from 'sequelize-typescript';

@Table
export class Address extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  username: string;

  @Column
  street: string;

  @Column
  street2: string;

  @Column
  city: string;

  @Column
  state_province_code: string;

  @Column
  state_province_name: string;

  @Column
  postal_code: string;

  @Column
  country_code: string;

  @Column
  location: string;

  @Column
  country: string;
}
