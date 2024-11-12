import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AddressModule } from './address/address.module';
import { AttributesModule } from './attributes/attributes.module';
import { BrandsModule } from './brands/brands.module';
import { CardModule } from './card/card.module';
import { CartModule } from './cart/cart.module';
import { CatgeoriesModule } from './catgeories/catgeories.module';
import { CouponModule } from './coupon/coupon.module';
import { CustomerModule } from './customer/customer.module';
import { ImagesModule } from './images/images.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentModule } from './payment/payment.module';
import { ProductModule } from './product/product.module';
import { ReviewsModule } from './reviews/reviews.module';
import { SalesModule } from './sales/sales.module';
import { SessionModule } from './session/session.module';
import { ShippingModule } from './shipping/shipping.module';
import { ShopsModule } from './shops/shops.module';
import { StaffModule } from './staff/staff.module';
import { TagsModule } from './tags/tags.module';
import { VariantsModule } from './variants/variants.module';
import { UsersModule } from './users/users.module';
import { VariantsOptionModule } from './variants-option/variants-option.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
      sortSchema: true,
    }),
    AddressModule,
    AttributesModule,
    BrandsModule,
    CardModule,
    CartModule,
    CatgeoriesModule,
    CouponModule,
    CustomerModule,
    ImagesModule,
    OrdersModule,
    PaymentModule,
    ProductModule,
    ReviewsModule,
    SalesModule,
    SessionModule,
    ShippingModule,
    ShopsModule,
    StaffModule,
    UsersModule,
    TagsModule,
    VariantsModule,
    VariantsOptionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
