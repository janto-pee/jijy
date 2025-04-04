import { Test, TestingModule } from '@nestjs/testing';
import { AddressResolver } from './address.resolver';
import { AddressService } from './address.service';
import { addressProviders } from './address.provider';

describe('AddressResolver', () => {
  let resolver: AddressResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddressResolver, AddressService, ...addressProviders],
    }).compile();

    resolver = module.get<AddressResolver>(AddressResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
