import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AddressModule } from './address/address.module';
// import { ShopsModule } from './shops/shops.module';
// import { StoredetailsModule } from './storedetails/storedetails.module';
// import { OrderModule } from './order/order.module';
// import { AttributeModule } from './attribute/attribute.module';
// import { ImagesModule } from './images/images.module';
// import { ProductModule } from './product/product.module';
// import { VariantModule } from './variant/variant.module';
// import { TagModule } from './tag/tag.module';
// import { CategoryModule } from './category/category.module';
// import { BrandModule } from './brand/brand.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    AddressModule,
    // ShopsModule,
    // StoredetailsModule,
    // OrderModule,
    // AttributeModule,
    // ImagesModule,
    // ProductModule,
    // VariantModule,
    // TagModule,
    // CategoryModule,
    // BrandModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
