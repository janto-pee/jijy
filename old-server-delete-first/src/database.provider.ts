import { Sequelize } from 'sequelize-typescript';
import { User } from './users/entities/user.entity';

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
        database: 'ecommerce',
      });
      sequelize.addModels([User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
