import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';
import { DatabaseModule } from 'src/database.module';
import { categoryProviders } from './category.provider';
import { ProductService } from 'src/product/product.service';
import { productProviders } from 'src/product/product.provider';
import { UserService } from 'src/user/user.service';
import { userProviders } from 'src/user/user.provider';

@Module({
  imports: [DatabaseModule],
  providers: [
    CategoryResolver,
    CategoryService,
    UserService,
    ...userProviders,
    ...categoryProviders,
    ProductService,
    ...productProviders,
  ],
})
export class CategoryModule {}
