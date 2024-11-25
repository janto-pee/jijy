import { Test, TestingModule } from '@nestjs/testing';
import { CustomerResolver } from './customer.resolver';
import { CustomerService } from './customer.service';
import { customerProviders } from './customer.provider';
import { UsersService } from 'src/users/users.service';
import { usersProviders } from 'src/users/users.provider';

describe('CustomerResolver', () => {
  let resolver: CustomerResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerResolver,
        CustomerService,
        ...customerProviders,
        UsersService,
        ...usersProviders,
      ],
    }).compile();

    resolver = module.get<CustomerResolver>(CustomerResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
