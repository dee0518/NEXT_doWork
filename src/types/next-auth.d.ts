import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  export interface Session {
    user: {
      userId: string | undefined;
    } & DefaultSession['user'];
  }
}
