import { NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';
import { createAccessToken, sendRefreshToken } from 'server/token';
import prisma from 'database/client';

export const api = async (req, res) => {
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

    let payload: any;
    try {
        payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch ({message}) {
        console.error(message);
        return res.status(401).json({accessToken: ''});
    }

    //valid token
    const user = await prisma.next_user.findFirst({where: {id: payload.id}});

    if (!user) {
        return res.status(401).json({accessToken: ''});
    }

    if (user.tokenVersion !== payload.tokenVersion) {
        return res.status(401).json({accessToken: ''});
    }

    sendRefreshToken(user.id, user.tokenVersion, res);

    return res.send({accessToken: createAccessToken(user.id, user.username)});
}

export default api;
