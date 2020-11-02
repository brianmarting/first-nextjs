"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRefreshToken = exports.createAccessToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const cookie_1 = require("cookie");
exports.createAccessToken = (id, username) => jsonwebtoken_1.sign({ id, username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_DURATION });
const createRefreshToken = (id, tokenVersion) => jsonwebtoken_1.sign({ id, tokenVersion }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_DURATION });
exports.sendRefreshToken = (id, tokenVersion, res) => {
    const token = createRefreshToken(id, tokenVersion);
    res.setHeader('Set-Cookie', cookie_1.serialize('rt', token, {
        httpOnly: false,
        path: '/'
    }));
};
//# sourceMappingURL=token.js.map