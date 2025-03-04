import { DataSource } from 'typeorm';
import { Attribute } from './entities/attribute.entity';

export const AttributeProviders = [
  {
    provide: 'ATTRIBUTE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Attribute),
    inject: ['DATA_SOURCE'],
  },
];
