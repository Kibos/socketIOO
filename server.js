var http=require('http');
var express=require('express');
var sio=require('socket.io');

var app=express();
var server=http.createServer(app);
app.get('/',function(req,res){
    res.sendfile(__dirname+'/index.html');
});
server.listen(3000);
var socket=sio.listen(server);

var names=[];
socket.sockets.on('connection',function(socket1){
    socket1.emit('login',names);
    socket1.on('login',function(name){
        names.push(name);
        socket.sockets.emit('login',names);
    });
});


