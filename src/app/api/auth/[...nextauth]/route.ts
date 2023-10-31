import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma/prisma'
import { NextApiHandler } from 'next';
import { NextRequest } from 'next/server';

const handler = NextAuth({
 providers: [
  GoogleProvider({
   clientId: process.env.GOOGLE_ID!,
   clientSecret: process.env.GOOGLE_SECRET!,
  }),
  Credentials({
   name: 'Credentials',
   credentials: {
	username: { label: "Username", type: "text" },
	password: { label: "Password", type: "password" }
   },
   async authorize(credentials) {
	if (!credentials) return null;
	const user = await prisma.user.findUnique({
		where: { name: credentials.username },
	});
	if (user && user.password === credentials.password)
		return user;
	else
		return null;
   }
  }),
 ],
 callbacks: {
  async signIn({ user, account, profile: p }) {
   try {
	if (account?.provider !== 'google') 
		return false;
	const profile = p as GoogleProfile;
	const existingUser = await prisma.user.findUnique({
		where: { googleId: user.id },
	});
	if (existingUser)
		return true;
	await prisma.user.create({
		data: {
			googleId: user.id,
			email: profile.email,
			name: profile.name,
			image: profile.image,
		},
	});
	return '/profile/login';
   } catch (e) {
	console.error(e);
	return false;
   }
  },
 },
 secret: process.env.SECRET!,
 session: {
  maxAge: 30 * 24 * 60 * 60,
  updateAge: 24 * 60 * 60,
 },
});

export { handler as GET, handler as POST }