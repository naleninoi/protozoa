import { Canvas } from "./lib/html/models/canvas";

const port = 3000;
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const canvas = new Canvas();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/lib/html/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    // socket.emit('redraw', JSON.stringify( canvas.render() ));
    
    socket.on('feed', (data) => {
        canvas.feed(data);
    });
});

http.listen(port, () => {
    console.log('listening on localhost:' + port);

    const processScene = function() {
        canvas.process();
        io.emit('redraw', canvas.render() );
        setTimeout( processScene, 100 );
    }

    processScene();
});