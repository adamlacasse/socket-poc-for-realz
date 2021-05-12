const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send(path.join(__dirname, 'public/index.html'));
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('buzz', (arg) => {
        console.log('this happened:');
        console.log(arg)
        io.sockets.emit('newBuzzer', arg);
    });
});

http.listen(3000, () => {
    console.log('listening on http://localhost:3000');
});
