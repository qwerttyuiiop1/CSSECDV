import { User as _DBUser } from '@prisma/client'
import prisma from '@prisma'

export type DBUser = _DBUser
const a: DBUser = {} as any

export type User = Pick<DBUser, 
	'name' | 'email' | 'email' | 'role' | 'points' | 'cartId'> & { image: string; }
type UserSelect = Omit<User, 'image'> & { imageid: string | null; }
export const userSelection: Record<keyof UserSelect, true> = {
	name: true,
	email: true,
	role: true,
	points: true,
	imageid: true,
	cartId: true,
}

export type UserDetail = Omit<DBUser, 'password' | 'createdAt' | 'updatedAt' | 'googleId' | 'imageid'> & { image: string; }
type UserDetailSelect = Omit<UserDetail, 'image'> & { imageid: string | null; }
export const userDetailSelection: Record<keyof UserDetailSelect, true> = {
    name: true,
    email: true,
	phoneVerified: true,
    emailVerified: true,
    address1: true,
    address2: true,
    city: true,
    country: true,
    mobileno: true,
    role: true,
	points: true,
	imageid: true,
	cartId: true,
}

type UserMapInput = UserSelect | UserDetailSelect
type UserMapOutput<T extends UserMapInput> = T extends UserDetailSelect ? UserDetail : User
export const mapUser = <T extends UserMapInput>(user: T): UserMapOutput<T> => {
	return { ...user, imageid: undefined, image: `/api/img/${user.imageid || ''}` };
}