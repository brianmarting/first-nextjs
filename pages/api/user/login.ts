import { NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';
import { createAccessToken, sendRefreshToken } from 'server/token';

//const prisma = new PrismaClient();

export const api = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    switch (method) {
        case 'POST':
            return await loginUser(req, res);
        default:
            return res.status(405);
    }
}

const loginUser = async (req: NextApiRequest, res: NextApiResponse) => {
    //const { username, password } = req.body;

    //const user = await getRepository(User).findOne({ where: { username } });

    //if (!user) {
    //return res.status(400).send({ message: 'Could not find user' });
    //}

    //const isValid = await compare(password, user.password);

    //if (!isValid) {
    //return res.status(400).send({ message: 'Invalid password' });
    //}

    sendRefreshToken("abtest", "0", res);

    return res.send({ accessToken: createAccessToken("abtest", "abb") });
}

export default api;
