import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';
import { WebSocketServer } from 'ws';
import { reducer } from '../controllers/index.js';

export const server = http.createServer(function (req, res) {
    const __dirname = path.resolve(path.dirname(''));
    const file_path =
        __dirname +
        (req.url === '/' ? '/front/index.html' : '/front' + req.url);
    fs.readFile(file_path, function (err, data) {
        if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        res.writeHead(200);
        res.end(data);
    });
});

const wss = new WebSocketServer({ server });

wss.on('connection', function connection(ws) {
    ws.on('error', console.error);

    ws.on('message', (data, isBinary) => reducer(ws, data, isBinary));
});
