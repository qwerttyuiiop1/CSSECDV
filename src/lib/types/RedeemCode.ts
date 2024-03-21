import prisma from '@prisma'

async function errors() {
  const res1: _DBRedeemCode = await prisma.redeemCode.findFirstOrThrow(redeemCodeSelection)
  const redeemCode: RedeemCode = mapRedeemCode(res1)
}
export const redeemCodeSelection = {
  select: {
	code: true,
	productId: true,
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
  productId: number | null
  amount: number
  creator: {
	name: string
	email: string
  }
}

export const mapRedeemCode = (dbRedeemCode: _DBRedeemCode): RedeemCode => {
  return {
	code: dbRedeemCode.code,
	isRedeemed: dbRedeemCode.productId !== null,
	amount: dbRedeemCode.amount,
	creator: {
	  name: dbRedeemCode.creator.name,
	  email: dbRedeemCode.creator.email
	}
  }
}