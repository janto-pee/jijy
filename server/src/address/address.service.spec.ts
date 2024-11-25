import { Test, TestingModule } from '@nestjs/testing';
import { AddressService } from './address.service';
import { addressProviders } from './address.provider';
import { UsersService } from 'src/users/users.service';
import { usersProviders } from 'src/users/users.provider';

describe('AddressService', () => {
  let service: AddressService;
  let initial: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        ...addressProviders,
        UsersService,
        ...usersProviders,
      ],
    }).compile();

    initial = module.get<UsersService>(UsersService);
    service = module.get<AddressService>(AddressService);
  });

  it('should be defined', () => {
    expect(initial).toBeDefined();
    expect(service).toBeDefined();
  });
});
