import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';
import { categoryProviders } from './category.provider';

@Module({
  providers: [CategoryResolver, CategoryService, ...categoryProviders],
})
export class CategoryModule {}
