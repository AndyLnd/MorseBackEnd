var http = require('http'),
    clients = [],

    app = http.createServer(function (req, res) {
        res.writeHead(200);
        res.end();
    });

var io = require('socket.io').listen(app);

io.on('connection', function (socket) {
    socket.emit('hello');
    socket.on('join room', function (data) {
        socket.join(data);
        console.log('connect to: ' + data);
    });
    socket.on('messageS', function (data) {
        console.log('message received: ' + data);
        console.log(socket.rooms);
        for (var i = 0; i < socket.rooms.length; i++) {
            if (socket.rooms[i] !== socket.id)
                io.in(socket.rooms[i]).emit('messageC', data)
        }
    });
    console.log('client connected');

});

app.listen(62178);
console.log('server started ...');