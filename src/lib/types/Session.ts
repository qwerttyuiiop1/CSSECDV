import { User } from "./User"
declare module "next-auth" {
	interface Session {
	  	user: User,
		expires: number,
		valid: boolean,
	}
}
declare module "next-auth/jwt" {
	interface JWT {
		user: User,
		expires: number,
		maxage: number,
	}
}