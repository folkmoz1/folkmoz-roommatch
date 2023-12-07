import NextAuth from 'next-auth';

interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  permissions?:
    | {
        can_add_room: boolean;
        can_book: boolean;
      }[]
    | null;
}

declare module 'next-auth' {
  interface Session {
    user: User;
    accessToken?: any;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: User;
    accessToken?: any;
  }
}
