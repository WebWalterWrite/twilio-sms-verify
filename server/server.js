import app from './app';
import http from 'http';

const server = http.createServer(app);

const port = 4000 || process.env.PORT;

server.listen(port, () => console.log("server ready to listen on port :", port))

