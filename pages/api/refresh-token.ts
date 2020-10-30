import { NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';
import { createAccessToken, sendRefreshToken } from 'server/token';

//const prisma = new PrismaClient();

export const api = async (req: NextApiRequest, res: NextApiResponse) => {
    const {method} = req;

    switch(method) {
        case 'POST':
            return await postRefreshToken(req, res);
        default:
            return res.status(405);
    }
}

const postRefreshToken = async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.rt;

    if (!token) {
        return res.status(401).json({accessToken: ''});
    }

    let payload;
    try {
        payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch ({message}) {
        console.error(message);
        return res.status(401).json({accessToken: ''});
    }

    // valid token
    //const user = await getRepository(User).findOne({externalId: payload.id});

    //if (!user) {
        //return sendInvalidAccessToken(res);
    //}

    //if (user.tokenVersion !== payload.tokenVersion) {
        //return sendInvalidAccessToken(res);
    //}

    sendRefreshToken("abtest", "0", res);

    return res.send({accessToken: createAccessToken("abtest", "abb")});

}

export default api;
