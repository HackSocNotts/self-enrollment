/**
 * @author Aaron Osher
 * @copyright HackSoc Nottingham 2020
 */

import express from 'express';
import app from './app';

const server = express();
const PORT = ((process.env.PORT as unknown) as number) || 3000;

server.use(app);

server.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
