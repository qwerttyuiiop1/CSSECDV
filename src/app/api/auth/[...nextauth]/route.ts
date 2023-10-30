import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const authOptions: NextAuthOptions = {
 providers: [
  GoogleProvider({
   clientId: process.env.GOOGLE_ID!,
   clientSecret: process.env.GOOGLE_SECRET!,
  }),
 ],
 callbacks: {
    async signIn({ user, account, profile }) {
		console.log('User signed in:', user);
		console.log('Authentication provider:', account?.provider);
		return '/profile/signup';
	},
 },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST};