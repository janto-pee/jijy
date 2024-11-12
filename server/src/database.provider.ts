import { Sequelize } from 'sequelize-typescript';
import { User } from './users/entities/user.entity';
import { Address } from './address/entities/address.entity';
import { Attribute } from './attributes/entities/attribute.entity';
import { Brand } from './brands/entities/brand.entity';
import { Card } from './card/entities/card.entity';
import { Cart } from './cart/entities/cart.entity';
import { Coupon } from './coupon/entities/coupon.entity';
import { Customer } from './customer/entities/customer.entity';
import { Image } from './images/entities/image.entity';
import { Order } from './orders/entities/order.entity';
import { Payment } from './payment/entities/payment.entity';
import { Product } from './product/entities/product.entity';
import { Review } from './reviews/entities/review.entity';
import { Sale } from './sales/entities/sale.entity';
import { Session } from './session/entities/session.entity';
import { Shipping } from './shipping/entities/shipping.entity';
import { Shop } from './shops/entities/shop.entity';
import { Staff } from './staff/entities/staff.entity';
import { Tag } from './tags/entities/tag.entity';
import { Variant } from './variants/entities/variant.entity';
import { VariantsOption } from './variants-option/entities/variants-option.entity';
import { Category } from './category/entities/category.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'secret',
        database: 'ecommerce',
      });
      sequelize.addModels([
        User,
        Address,
        Attribute,
        Brand,
        Card,
        Cart,
        Category,
        Coupon,
        Customer,
        Image,
        Order,
        Payment,
        Product,
        Review,
        Sale,
        Session,
        Shipping,
        Shop,
        Staff,
        Tag,
        Variant,
        VariantsOption,
      ]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
