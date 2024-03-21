import prisma from '@prisma'

async function errors() {
  const res1: _DBRedeemCode = await prisma.redeemCode.findFirstOrThrow(redeemCodeSelection)

}
export const redeemCodeSelection = {
  select: {
	code: true,
	transaction: {
	  select: { id: true }
	},
	amount: true,
	creator: {
	  select: {
		name: true,
		email: true
	  }
	}
  }
}
export type RedeemCode = {
  code: string
  isRedeemed: boolean
  amount: number
  creator: {
	name: string
	email: string
  }
}

export type _DBRedeemCode = {
  code: string
  transaction: {
	id: string
  } | null
  amount: number
  creator: {
	name: string
	email: string
  }
}

export const mapRedeemCode = (dbRedeemCode: _DBRedeemCode): RedeemCode => {
  return {
	code: dbRedeemCode.code,
	isRedeemed: !!dbRedeemCode.transaction,
	amount: dbRedeemCode.amount,
	creator: {
	  name: dbRedeemCode.creator.name,
	  email: dbRedeemCode.creator.email
	}
  }
}