var PORT = process.env.PORT || 8080;
const http = require('http');
const express = require('express');
const socketio = require('socket.io');


const app = express();

const clientPath = `${__dirname}/../client`;
console.log(`Serving static from ${clientPath}`);

app.use(express.static(clientPath));

const server = http.createServer(app);

const io = socketio(server);

io.on('connection', (sock) => {
    console.log('Someone connected');
    sock.emit('message', 'Andrew: Hi, you are connected');
    sock.emit('message', 'Andrew: Thank you for testing my app');

    sock.on('message', (text) => {
        io.emit('message', text);
    });
});

server.on('error', (err) => {
    console.error('Server error:', err);
});

server.listen(PORT, () => {
    console.log('RPS server started on 8080');
});