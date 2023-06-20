import { createServer } from "http";
import { Server } from "socket.io";
import { uid as generateUID } from 'uid';

const httpServer = createServer();

const io = new Server(httpServer, {
 cors: {
  origin: "http://localhost:3000",
 },
});

io.on("connection", (socket) => {
 socket.on('create new room', (userInfo) => {
  const uid = generateUID(5)
  const payload = {
   username: userInfo.username,
   roomID: uid
  }
  socket.join(payload.roomID);
  socket.emit('new room', payload)
 })
});


const PORT = process.env.PORT || 3030;

httpServer.listen(PORT, () =>
 console.log(`server listening at http://localhost:${PORT}`)
);
