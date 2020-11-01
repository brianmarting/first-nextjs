import { PrismaClient } from '@prisma/client';
import { compare, hash } from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';
import { createAccessToken, sendRefreshToken } from 'server/token';

const prisma = new PrismaClient();

export const api = async (req: NextApiRequest, res: NextApiResponse) => {
    const {method} = req;

    switch (method) {
        case 'POST':
            return await loginUser(req, res);
        default:
            return res.status(405);
    }
};

const loginUser = async (req: NextApiRequest, res: NextApiResponse) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).send({message: 'username/password is required.'});
    }

    const user = await prisma.next_user.findFirst({where: {username}});

    if (!user) {
        return res.status(400).send({message: 'Could not find user'});
    }

    console.log(await hash(password, 12));

    const isValid = await compare(password, user.password);

    if (!isValid) {
        return res.status(400).send({message: 'Invalid password'});
    }

    sendRefreshToken(user.id, user.tokenVersion, res);

    return res.send({accessToken: createAccessToken(user.id, user.username)});
};

export default api;
