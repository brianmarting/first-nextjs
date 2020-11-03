import { hash } from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'database/client';

export const api = async (res: NextApiResponse, req) => {
    const {method} = req;

    switch (method) {
        case 'GET':
            const users = await prisma.next_user.findMany();
            return res.status(200).json(users);
        case 'POST':
            return createUser(req, res);
        default:
            return res.status(405);
    }
};

const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const {username, password, email} = req.body;
        const hashedPassword = await hash(password, 12);

        await prisma.next_user.create({
            data: {
                username,
                password: hashedPassword,
                tokenVersion: '0',
                email
            }
        });
    } catch ({message}) {
        console.error(message);
        return res.status(400).send({message: message});
    }

    return res.send({message: 'Successfully created user.'});
};

export default api;
