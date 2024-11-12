import { Attribute } from './entities/attribute.entity';

export const attributesProviders = [
  {
    provide: 'ATTRIBUTES_REPOSITORY',
    useValue: Attribute,
  },
];
