import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export const api = async (req: NextApiRequest, res: NextApiResponse) => {
    const {method} = req;

    switch (method) {
        case 'GET':
            return await getUserDetails(req, res);
        default:
            return res.status(405);
    }
};

const getUserDetails = async (req: NextApiRequest, res: NextApiResponse) => {
    const {query: {id}} = req;

    const user = await prisma.next_user.findOne({where: {id: +id}});

    return res.send({...user});
};

export default api;
