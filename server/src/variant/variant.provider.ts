import { Variant } from './entities/variant.entity';

export const variantProviders = [
  {
    provide: 'VARIANT_REPOSITORY',
    useValue: Variant,
  },
];
