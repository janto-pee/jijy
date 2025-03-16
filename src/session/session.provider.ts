import { Session } from './entities/session.entity';

export const sessionProviders = [
  {
    provide: 'SESSION_REPOSITORY',
    useValue: Session,
  },
];
