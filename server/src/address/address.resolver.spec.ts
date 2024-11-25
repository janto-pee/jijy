import { Test, TestingModule } from '@nestjs/testing';
import { AddressResolver } from './address.resolver';
import { AddressService } from './address.service';
import { addressProviders } from './address.provider';
import { UsersService } from 'src/users/users.service';
import { usersProviders } from 'src/users/users.provider';

describe('AddressResolver', () => {
  let resolver: AddressResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressResolver,
        AddressService,
        ...addressProviders,
        UsersService,
        ...usersProviders,
      ],
    }).compile();

    resolver = module.get<AddressResolver>(AddressResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
