var http = require('http'),
    clients = [],

    app = http.createServer(function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Hello World\n');
    });

var io = require('socket.io').listen(app);

io.on('connection', function (socket) {
    socket.emit('hello');
    socket.on('join room', function (data) {
        socket.join(data);
        console.log('connect to: ' + data);
    });
    socket.on('message', function (data) {
        console.log('message received: ' + data);
        for (var i = 0; i < socket.rooms.length; i++) {
            if (socket.rooms[i] !== socket.id)
                io.in(socket.rooms[i]).emit('message', data)
        }
    });
    console.log('client connected');

});

app.listen(64021);
console.log('server started ...');