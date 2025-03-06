import { Image } from './entities/image.entity';

export const imageProviders = [
  {
    provide: 'IMAGE_REPOSITORY',
    useValue: Image,
  },
];
