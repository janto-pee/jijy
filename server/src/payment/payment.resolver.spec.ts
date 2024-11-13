import { Test, TestingModule } from '@nestjs/testing';
import { PaymentResolver } from './payment.resolver';
import { PaymentService } from './payment.service';
import { paymentProviders } from './payment.provider';

describe('PaymentResolver', () => {
  let resolver: PaymentResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentResolver, PaymentService, ...paymentProviders],
    }).compile();

    resolver = module.get<PaymentResolver>(PaymentResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
