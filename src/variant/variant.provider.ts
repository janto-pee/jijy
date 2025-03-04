import { DataSource } from 'typeorm';
import { Variant } from './entities/variant.entity';

export const variantProviders = [
  {
    provide: 'VARIANT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Variant),
    inject: ['DATA_SOURCE'],
  },
];
