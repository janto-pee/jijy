import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesResolver } from './images.resolver';
import { DatabaseModule } from 'src/database.module';
import { imagesProviders } from './image.provider';

@Module({
  imports: [DatabaseModule],
  providers: [...imagesProviders, ImagesResolver, ImagesService],
})
export class ImagesModule {}
