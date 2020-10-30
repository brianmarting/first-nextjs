import { NextApiRequest, NextApiResponse } from 'next';

//const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {method} = req;

    switch(method) {
        case 'GET':
            //const users = await prisma.nextjs_user.findMany();
            const users = [{name: 'bl', email: 'gf@gg.com'}];
            return res.status(200).json(users);
        default:
            return res.status(405);
    }
}
