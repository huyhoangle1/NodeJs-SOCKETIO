var express =require('express');
const { Server } = require('http');
const { Socket } = require('socket.io');
var app = express()
app.use(express.static("./public"))
app.set("view engine","ejs");
app.set("views","./views");


var server = require('http').Server(app);
var io=require("socket.io")(server);
server.listen(3000);

io.on('connection',(Socket)=>{
    console.log('co nguoi ket noi ' + Socket.id);

Socket.on('CLIENT-SEND-MAU',(data)=>{
    console.log(data);
    io.sockets.emit('CLIENT-SEND-MAU',data)
})
});

app.get("/",function(req,res){
    res.render('trangchu')
})