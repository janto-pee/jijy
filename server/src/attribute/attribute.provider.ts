import { Attribute } from './entities/attribute.entity';

export const attributeProviders = [
  {
    provide: 'ATTRIBUTE_REPOSITORY',
    useValue: Attribute,
  },
];
