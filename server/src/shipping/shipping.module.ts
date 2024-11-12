import { Module } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { ShippingResolver } from './shipping.resolver';
import { shippingProviders } from './shipping.providers';

@Module({
  providers: [ShippingResolver, ShippingService, ...shippingProviders],
})
export class ShippingModule {}
