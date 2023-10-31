import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

type UserApiRequest = NextApiRequest & {
	// TODO: fix when user is typed
	session: Session
}
export type UserApiHandler = (req: UserApiRequest, res: NextApiResponse) => void | Promise<void>;

function withUser(handler: UserApiHandler): NextApiHandler {
	return async (req, res) => {
		const session = await getSession({ req });
		if (!session) {
			res.status(401).end();
			return;
		}
		// TODO: if user is not verified, redirect to /profile/signup
		const ureq = req as UserApiRequest;
		ureq.session = session;
		return handler(ureq, res);
	}
}

export default withUser;