import { Test, TestingModule } from '@nestjs/testing';
import { StaffService } from './staff.service';
import { StaffProviders } from './staff.providers';

describe('StaffService', () => {
  let service: StaffService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StaffService, ...StaffProviders],
    }).compile();

    service = module.get<StaffService>(StaffService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
