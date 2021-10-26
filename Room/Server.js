var express =require('express');
const { Server } = require('http');
const { socket } = require('socket.io');
var app = express()
app.use(express.static("./public"))
app.set("view engine","ejs");
app.set("views","./views");


var server = require('http').Server(app);
var io=require("socket.io")(server);
server.listen(3000);

io.on('connection',(socket)=>{
    console.log('co nguoi ket noi ' + socket.id);
    // console.log( socket );
    socket.on("tao-room",function(data){
        socket.join(data);
        socket.Phong=data;
        // console.log( socket.adapter.rooms ); //show danh sach room dang co
        var arr = [];

        for (const room of socket.adapter.rooms) {
            arr.push(room[0]);
        }
    });
    });



app.get("/",function(req,res){
    res.render('trangchu')
})