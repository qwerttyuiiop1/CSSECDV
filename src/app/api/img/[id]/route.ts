import { NextRequest, NextResponse } from "next/server";
import prisma from "@prisma";
import { withOptionalUser } from "@/lib/session/withUser";

type Params = {
	params: {
		id: string
	}
}
export const GET = withOptionalUser(async (req, { params: { id } }: Params) => {
  if (typeof id !== 'string')
	return NextResponse.json({ error: 'Invalid image ID' }, { status: 400 });
  const res = await prisma.image.findUnique({
	where: { id },
	select: { file: true, ownerEmail: true, isPublic: true }
  });
  if (!res)
  	return NextResponse.json({ error: 'Image not found' }, { status: 404 });
  if (!res.isPublic && res.ownerEmail !== req.user?.email)
  	return NextResponse.json({ error: 'Image not found' }, { status: 404 });
  return new NextResponse(res.file)
});