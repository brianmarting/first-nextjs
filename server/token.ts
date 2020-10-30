import { sign } from 'jsonwebtoken';
import { NextApiResponse } from "next";
import { serialize } from 'cookie'

export const createAccessToken = (id: string, username: string) => sign({ id, username }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: process.env.ACCESS_TOKEN_DURATION });

const createRefreshToken = (id: string, tokenVersion: string) =>
    sign({ id, tokenVersion }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: process.env.REFRESH_TOKEN_DURATION });

export const sendRefreshToken = (id: string, tokenVersion: string, res: NextApiResponse) => {
    const token = createRefreshToken(id, tokenVersion);
    res.setHeader('Set-Cookie', serialize(
        'rt',
        token,
        {
            httpOnly: false,
            path: '/'
        }
    ));
};