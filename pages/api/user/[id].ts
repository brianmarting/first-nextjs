import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'database/client';

export const api = async (res, req) => {
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
