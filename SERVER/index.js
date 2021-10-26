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
    Socket.on("disconnect",()=>{
        console.log(Socket.id + " ngat ket noi!!!!!");
    });
    Socket.on("Client-send-data",(data)=>{
        console.log(Socket.id + 'vua gui ' +  data);
        io.sockets.emit("Server-send-data",data +"888") // tat ca moi nguoi
        // Socket.emit("Server-send-data",data +"888") //ai phat thi thg dos nhaan
        // Socket.broadcast.emit("Server-send-data",data+'888')// tru cai chinh
    });

});

app.get("/",function(req,res){
    res.render('trangchu')
})