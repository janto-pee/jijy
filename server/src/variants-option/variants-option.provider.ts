import { VariantsOption } from './entities/variants-option.entity';

export const VariantsOptionProviders = [
  {
    provide: 'VariantsOptionS_REPOSITORY',
    useValue: VariantsOption,
  },
];
