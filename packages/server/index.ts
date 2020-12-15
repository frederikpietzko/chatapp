import { json } from 'body-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import { setupBaseMessageHandlers } from './src/messageHandlers';
import { routes } from './src/routes';

const PORT = process.env.PORT || 4000;

const app = express();
app.use(json());
app.use(cors() as any);

for (const route of routes) {
  app.use(route);
}

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] },
});

// const _ = ChatroomManager.instance;

const setupInitialMessageHandlers = setupBaseMessageHandlers();

io.on('connection', (socket: Socket) => {
  console.log('new connection');
  setupInitialMessageHandlers(socket);
});

server.listen(PORT, () => {
  console.info(`Server is listening on Port: ${PORT}`);
});
