import { User as _DBUser } from '@prisma/client'

export type DBUser = _DBUser

export type User = Pick<DBUser, 
	'name' | 'email' | 'image' | 'email' | 'role' | 'walletConnected' | 'points'>
export const userSelection: Record<keyof User, true> = {
	name: true,
	email: true,
	image: true,
	role: true,
	walletConnected: true,
	points: true,
}

export type UserDetail = Omit<DBUser, 'password' | 'createdAt' | 'updatedAt' | 'googleId'>
export const userDetailSelection: Record<keyof UserDetail, true> = {
    name: true,
    image: true,
    email: true,
	phoneVerified: true,
    emailVerified: true,
    address1: true,
    address2: true,
    city: true,
    country: true,
    mobileno: true,
    role: true,
	walletConnected: true,
	points: true,
}