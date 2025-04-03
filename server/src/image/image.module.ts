import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageResolver } from './image.resolver';
import { DatabaseModule } from 'src/database.module';
import { imageProviders } from './image.provider';

@Module({
  imports: [DatabaseModule],
  providers: [ImageResolver, ImageService, ...imageProviders],
})
export class ImageModule {}
