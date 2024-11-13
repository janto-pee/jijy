import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from './payment.service';
import { paymentProviders } from './payment.provider';

describe('PaymentService', () => {
  let service: PaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentService, ...paymentProviders],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
