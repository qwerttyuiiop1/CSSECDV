import { User as _DBUser } from '@prisma/client'

export type DBUser = _DBUser

export type User = Pick<DBUser, 
	'id' | 'name' | 'email' | 'image' | 'email' | 'verified' | 'isAdmin'>
export const userSelection: Record<keyof User, true> = {
	id: true,
	name: true,
	email: true,
	image: true,
	verified: true,
	isAdmin: true,
}

export type UserDetail = Omit<DBUser, 'password' | 'createdAt' | 'updatedAt' | 'googleId'>
export const userDetailSelection: Record<keyof UserDetail, true> = {
    id: true,
    name: true,
    image: true,
    email: true,
    emailVerified: true,
    verified: true,
    address1: true,
    address2: true,
    city: true,
    country: true,
    mobileno: true,
    isAdmin: true,
}