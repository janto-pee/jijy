import { Staff } from './entities/staff.entity';

export const StaffProviders = [
  {
    provide: 'STAFF_REPOSITORY',
    useValue: Staff,
  },
];
