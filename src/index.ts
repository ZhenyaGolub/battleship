import { server } from './http_server/index.js';

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
server.listen(HTTP_PORT);
