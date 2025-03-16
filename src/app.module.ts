import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddressModule } from './address/address.module';
import { AttributeModule } from './attribute/attribute.module';
import { BrandModule } from './brand/brand.module';
import { CategoryModule } from './category/category.module';
import { ImageModule } from './image/image.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { ShopModule } from './shop/shop.module';
import { TagModule } from './tag/tag.module';
import { VariantModule } from './variant/variant.module';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { SessionModule } from './session/session.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),

    AddressModule,
    UserModule,
    SessionModule,
    AttributeModule,
    BrandModule,
    CategoryModule,
    ImageModule,
    OrderModule,
    ProductModule,
    ShopModule,
    TagModule,
    VariantModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
