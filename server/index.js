import { createServer } from "http";
import { Server } from "socket.io";
import { uid as generateUID } from 'uid';

const httpServer = createServer();

const io = new Server(httpServer, {
 cors: {
  origin: "http://localhost:3000",
 },
});

const users = []

io.on("connection", (socket) => {
 socket.on('create new room', (userInfo) => {
  const uid = generateUID(5)
  socket.join(uid);


  const payload = {
   username: userInfo.username,
   socket_id: socket.id,
   roomID: uid
  }

  users.push(payload)
  socket.emit('new room', payload)


  io.to(uid).emit('users update', users)
 })


 socket.on("join room", (roomID) => {
  socket.join(roomID);
  const usersInRoom = users.filter((user) => user.roomID === roomID);
  io.to(roomID).emit("users update", usersInRoom);
 });


});


const PORT = process.env.PORT || 3030;

httpServer.listen(PORT, () =>
 console.log(`server listening at http://localhost:${PORT}`)
);
