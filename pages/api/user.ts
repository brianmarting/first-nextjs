import { hash } from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'database/client';

export const api = async (res, req) => {
    const {method} = req;

    switch (method) {
        case 'GET':
            const users = await prisma.next_user.findMany({
                include: {location: true}
            });
            return res.status(200).json(users);
        case 'POST':
            return createUser(req, res);
        default:
            return res.status(405);
    }
};

const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const {username, password, email, location: {street, streetNumber, postalCode, town, country}} = req.body;

        const hashedPassword = await hash(password, 12);

        await prisma.next_user.create({
            data: {
                username,
                password: hashedPassword,
                tokenVersion: '0',
                email,
                location: {
                    create: {
                        street,
                        streetNumber,
                        postalCode,
                        town,
                        country
                    }
                }
            }
        });
    } catch ({message}) {
        console.error(message);
        return res.status(400).json({message: message});
    }

    return res.send({message: 'Successfully created user.'});
};

export default api;
