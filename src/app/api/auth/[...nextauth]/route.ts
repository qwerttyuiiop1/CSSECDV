import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import prisma from '@prisma'
import bcrypt from 'bcrypt';
import { User, mapUser, userSelection } from '@type/User';
import { JWT } from 'next-auth/jwt';

export const authOptions: NextAuthOptions = {
 providers: [
  Credentials({
   name: 'Credentials',
   id: 'credentials',
   credentials: {
	email: { label: "Email", type: "email" },
	password: { label: "Password", type: "password" },
	recaptchaToken: { label: "CaptchaToken", type: "text" },
   },
   async authorize(credentials) {
	if (!credentials) return null;
	const user = await prisma.user.findUnique({
		where: { email: credentials.email },
		select: { ...userSelection, password: true },
	});

	if (user?.password && 
		await bcrypt.compare(credentials.password, user.password)) {
		const response = await fetch('https://www.google.com/recaptcha/api/siteverify' + 
			`?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${credentials.recaptchaToken}`, {
			method: 'POST'
		});
		if (!response.ok) return null;
		const { success } = await response.json();
		if (success !== true) return null;
		const res: User = mapUser(user);
		return { ...res, id: user.email, password: undefined };
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
	if (!existingUser) {
		await prisma.user.create({
			data: {
				googleId: user.id,
				email: profile.email,
				name: profile.name,
				cart: { create: {} }
			},
		});
	}
	return true;
  },
  async jwt({ token, user, trigger }) {
	const error = {
		...token,
		user: null,
		expires: -1,
	} as unknown as JWT
	if (trigger === 'signIn') {
		if (!user.email || typeof user.email !== 'string')
			return error;
		const newUser = await prisma.user.findUnique({
			where: { email: user.email },
			select: userSelection,
		});
		if (!newUser) return error;
		token.user = mapUser(newUser);
		token.expires = Date.now() + 30 * 60 * 1000; // 30 minutes
		token.maxage = Date.now() + 3 * 24 * 60 * 60 * 1000; // 7 days
		return token;
	}
	if (!token?.user) return error;
	if (!(token.expires >= Date.now())) return error;
	token.expires = Math.min(Math.max(
		token.expires, Date.now() + 30 * 60 * 1000 // 30 minutes
	), token.maxage);
	return token;
  },
  async session({ session, token }) {
	if (token?.user)
		session.user = token.user;
	if (token?.expires)
		session.expires = token.expires;
	session.valid = token.expires >= Date.now()
	return session;
  },
 },
 secret: process.env.SECRET!,
 session: {
  maxAge: 30 * 24 * 60 * 60, // 30 days
  updateAge: 24 * 60 * 60, // 24 hours
 }
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }