import { fstat } from "fs";
import { NextApiRequest, NextApiResponse } from "next";

const express = require("express");
const next = require("next")
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const port = process.env.PORT || 3000;
const handle = app.getRequestHandler();
const fs = require('fs');

(async () => {
  await app.prepare();
  const server = express();

  server.all("*", (req: NextApiRequest, res: NextApiResponse) => {
    return handle(req, res);
  });
  server.listen(port, (err: any) => {
    if (err) throw err;
    console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
  });
})();
