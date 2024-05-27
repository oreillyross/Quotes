import * as http from 'http';
import { readFileSync } from 'fs';
import { join } from 'path';
import {messages as quotes} from './messages'

// Create HTTP server
const server = http.createServer((req, res) => {
    console.info(req.url, req.method, req.headers)
    if (req.url === '/') {
        // Serve HTML page
        const html = readFileSync(join(process.cwd(), 'index.html'), 'utf8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
    } else if (req.url === '/quotes') {
        // Serve quotes as JSON
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(quotes));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

// Start server
const port = 3000;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
