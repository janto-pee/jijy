import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';
import { DatabaseModule } from 'src/database.module';
import { categoryProviders } from './category.provider';

@Module({
  imports: [DatabaseModule],
  providers: [CategoryResolver, CategoryService, ...categoryProviders],
})
export class CategoryModule {}
