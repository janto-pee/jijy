import { DataTypes } from 'sequelize';
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  Default,
  CreatedAt,
  UpdatedAt,
  BeforeCreate,
  BeforeUpdate,
} from 'sequelize-typescript';

@Table
export class User extends Model {
  @PrimaryKey
  @Column
  id: string;

  @Column
  username: string;

  @Column
  first_name: string;

  @Column
  hashed_password: string;

  @Column
  last_name: string;

  @Column
  email: string;

  @Column
  address: string;

  @Column
  address2: string;

  @Column
  city: string;

  @Column
  country: string;

  @Default('nanoid')
  @Column
  verificationCode: string;

  @Default(null)
  @Column
  passwordResetCode: string;

  @Default(false)
  @Column
  is_email_verified: boolean;

  @Default('0-0-0-0')
  @Column
  password_changed_at: Date;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  //   @OneToMany(() => Auth, (auth) => auth.userId)
  //   auths: Auth[];

  //   @BeforeCreate()
  //   @BeforeUpdatebrig()
  //   async beforeInsert() {
  //     try {
  //       const hash = await hashPassword(this.hashed_password);

  //       this.hashed_password = hash;
  //     } catch (e) {
  //       log.error(e, 'Could not validate password');
  //       return false;
  //     }
  //   }
}
