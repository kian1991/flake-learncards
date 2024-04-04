import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from './db/primsa-client';

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	adapter: PrismaAdapter(db),
	callbacks: {
		session: async ({ session, token }) => {
			if (token.sub) session.user.id = token.sub;
			return session;
		},
	},
	session: {
		strategy: 'jwt',
	},
	...authConfig,
});
