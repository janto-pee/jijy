import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesResolver } from './images.resolver';
import { imageProviders } from './images.provider';

@Module({
  providers: [ImagesResolver, ImagesService, ...imageProviders],
})
export class ImagesModule {}
