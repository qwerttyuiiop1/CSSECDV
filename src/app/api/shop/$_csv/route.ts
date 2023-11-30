import prisma from "@/lib/prisma/prisma";
import { withAdmin } from "@/lib/session/withUser";
import { NextResponse } from "next/server";
import csv from "csv-parser";
import { Readable } from "stream";


export const POST = withAdmin(async (req) => {
  try {
	const data = await req.formData()
	const file = data.get('file') as File
	const readable = new Readable()
	readable.push(Buffer.from(await file.arrayBuffer()))
	readable.push(null)
	const results = await new Promise((resolve, reject) => {
	  const res = [] as any[]
	  readable.pipe(csv({ mapHeaders: ({ header }) => header.toLowerCase() }))
		.on('data', (data) => res.push(data))
		.on('end', () => resolve(res))
		.on('error', reject)
	}) as {code: string; product: string; shop: string}[]
	await prisma.$transaction(results.map(result => prisma.code.create({
	  data: {
		code: result.code,
		product: {
		  connect: {
			name_shopName_isActive: {
			  name: result.product,
			  shopName: result.shop,
			  isActive: true,
			}
		  }
		}
	  }
	})));
	
	return NextResponse.json({ message: "Success" }, { status: 200 })
  } catch (error) {
	console.log(error);
	return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
});