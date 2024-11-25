import { Test, TestingModule } from '@nestjs/testing';
import { StaffResolver } from './staff.resolver';
import { StaffService } from './staff.service';
import { StaffProviders } from './staff.providers';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { usersProviders } from 'src/users/users.provider';

describe('StaffResolver', () => {
  let resolver: StaffResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StaffResolver,
        StaffService,
        ...StaffProviders,
        UsersService,
        ...usersProviders,
      ],
    }).compile();

    resolver = module.get<StaffResolver>(StaffResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
