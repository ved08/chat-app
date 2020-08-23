let express = require('express');
let socket = require('socket.io')
//App setup
let app = express();
let server = app.listen(3000, () => {
    console.log("Listening to port 300")
});

// Serve Static files
app.use(express.static('public'));

// Socket setup
let io = socket(server);

io.on('connection', (socket) => {
    console.log("Made Socket Connection", socket.id);

    socket.on('chat', (data) => {
        io.sockets.emit('chat', data)
    });

    socket.on('typing', (data) => {
        socket.broadcast.emit("typing", data)
    })
});