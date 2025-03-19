import { Sequelize } from 'sequelize-typescript';
import { Address } from './address/entities/address.entity';
import { Attribute } from './attribute/entities/attribute.entity';
import { Brand } from './brand/entities/brand.entity';
import { Category } from './category/entities/category.entity';
import { Order } from './order/entities/order.entity';
import { Image } from './image/entities/image.entity';
import { Product } from './product/entities/product.entity';
import { Shop } from './shop/entities/shop.entity';
import { Tag } from './tag/entities/tag.entity';
import { User } from './user/entities/user.entity';
import { Variant } from './variant/entities/variant.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'root',
        password: 'secret',
        database: 'nest',
      });
      sequelize.addModels([
        Address,
        Address,
        Attribute,
        Brand,
        Category,
        Image,
        Order,
        Product,
        Shop,
        Tag,
        Variant,
        User,
      ]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
