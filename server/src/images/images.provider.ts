import { Image } from './entities/image.entity';

export const imageProviders = [
  {
    provide: 'IMAGES_REPOSITORY',
    useValue: Image,
  },
];
