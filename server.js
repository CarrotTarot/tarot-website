const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('New user connected:', socket.id);
  
  socket.on('tarotReading', ({ question, cards }) => {
    const response = `You asked: ${question}. Cards drawn: ${cards.join(', ')}. Here's your tarot reading...`; // Replace with actual AI tarot reading
    socket.emit('tarotReading', response);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
