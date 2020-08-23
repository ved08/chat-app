let express = require('express');
let socket = require('socket.io')
//App setup
let app = express();
let port = process.env.PORT || 3000
let server = app.listen(port, () => {
    console.log("Listening to port " + port)
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