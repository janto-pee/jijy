import { DataSource } from 'typeorm';
import { Storedetail } from './entities/storedetail.entity';

export const storedetailsProviders = [
  {
    provide: 'STOREDETAILS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Storedetail),
    inject: ['DATA_SOURCE'],
  },
];
