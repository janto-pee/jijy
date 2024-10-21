import { Session } from './entities/session.entity';

export const usersProviders = [
  {
    provide: 'SESSION_REPOSITORY',
    useValue: Session,
  },
];
