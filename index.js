var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();
var server = app.listen(2222, function(){
    console.log('listening for requests on port 2222,');
});

// Static files
app.use(express.static('public'));

app.get("/guest/s/:site/", function(req, res) {
    res.redirect("/?id="+req.query.id+"&ap="+req.query.ap+"&site="+req.params.site);
});

// Socket setup & pass server
var io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('chat', function(data){
        // console.log(data);
        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

});
