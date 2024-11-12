import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentResolver } from './payment.resolver';
import { paymentProviders } from './payment.provider';

@Module({
  providers: [PaymentResolver, PaymentService, ...paymentProviders],
})
export class PaymentModule {}
