import CredentialProvider from 'next-auth/providers/credentials';
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import type { NextAuthOptions } from 'next-auth';
import LineProvider from 'next-auth/providers/line';
import { prisma } from '@/lib/prisma';
import { UserAPI } from '@/lib/apis/UserAPI';
import { getServerSession } from 'next-auth';

export const config = {
  session: {
    strategy: 'jwt',
  },
  secret: process.env.SECRET,
  providers: [
    LineProvider({
      clientId: process.env.LINE_CLIENT_ID as string,
      clientSecret: process.env.LINE_CLIENT_SECRET as string,
    }),
    CredentialProvider({
      name: 'Sign In',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'hello@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const { user } = await UserAPI.signIn(credentials);

        if (user) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (!account) {
        return false;
      }

      const { type, provider } = account;

      if (type === 'credentials') {
        console.log('called signIn');
        console.log('Credentials login');

        return true;
      }

      if (type === 'oauth' && provider === 'line') {
        const { id, name, image } = user;
        console.log('called signIn');
        console.log('Line login');

        const { user: exists, status } = await UserAPI.isExists(id);
        if (!exists) {
          await prisma.user.create({
            data: {
              name,
              image,
              provider: 'LINE',
              providerId: id,
              phone_number: '',
              permissions: {
                create: {},
              },
            },
            include: {
              permissions: true,
            },
          });
        }

        return true;
      }
      return false;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.user = user;
      }

      if (account) {
        if (account.type === 'credentials') {
          const findUser = await prisma.user.findFirst({
            where: {
              email: account.id as string,
            },
            select: {
              permissions: {
                select: {
                  can_book: true,
                  can_add_room: true,
                },
              },
            },
          });

          if (user) {
            token.user.permissions = findUser!.permissions;
          }
        }

        if (account.type === 'oauth' && account.provider === 'line') {
          const findUser = await prisma.user.findFirst({
            where: {
              providerId: account.providerAccountId as string,
            },
            select: {
              id: true,
              permissions: {
                select: {
                  can_book: true,
                  can_add_room: true,
                },
              },
            },
          });

          if (user) {
            token.user.id = findUser!.id;
            token.user.permissions = findUser!.permissions;
          }
        }
        token.account = account;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.user) {
        session.user = token.user;
      }

      return session;
    },
  },
} satisfies NextAuthOptions;

export function auth(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config);
}
