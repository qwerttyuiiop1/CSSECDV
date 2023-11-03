import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma/prisma'
import bcrypt from 'bcrypt';
import { userSelection } from '@/lib/types/User';

const authOptions: NextAuthOptions = {
 providers: [
  Credentials({
   name: 'Credentials',
   id: 'credentials',
   credentials: {
	email: { label: "Email", type: "email" },
	password: { label: "Password", type: "password" }
   },
   async authorize(credentials) {
	if (!credentials) return null;
	const user = await prisma.user.findUnique({
		where: { email: credentials.email },
		select: { ...userSelection, password: true },
	});
	if (user?.password && 
		await bcrypt.compare(credentials.password, user.password)) {
		delete (user as any).password;
		return user;
	} else {
		return null;
	}
   },
  }),
  GoogleProvider({
   clientId: process.env.GOOGLE_ID!,
   clientSecret: process.env.GOOGLE_SECRET!,
  }),
 ],
 callbacks: {
  async signIn({ user, account, profile: p }) {
	if (account?.provider !== 'google') 
		return account?.provider === 'credentials';
	const profile = p as GoogleProfile;
	const existingUser = await prisma.user.findUnique({
		where: { googleId: user.id },
	});
	if (!existingUser)
		await prisma.user.create({
			data: {
				googleId: user.id,
				email: profile.email,
				name: profile.name,
				image: profile.image,
			},
		});
	return true;
  },
  async jwt({ token, user }) {
	if (user?.email && token.user?.email !== user.email) 
		(token.user as any) = user;
	// verified is defined if the user is logged in with credentials
	if (token.user.verified === undefined) {
		const user = await prisma.user.findUnique({
			where: { email: token.user.email },
			select: userSelection,
		});
		if (user) token.user = user;
	}
	return token;
  },
  async session({ session, token }) {
	if (token?.user)
		session.user = token.user;
	return session;
  },
 },
 secret: process.env.SECRET!,
 session: {
  maxAge: 30 * 24 * 60 * 60,
  updateAge: 24 * 60 * 60,
 }
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }