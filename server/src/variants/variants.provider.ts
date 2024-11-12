import { Variant } from './entities/variant.entity';

export const variantsProviders = [
  {
    provide: 'VARIANTS_REPOSITORY',
    useValue: Variant,
  },
];
