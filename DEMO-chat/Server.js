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


var mangUser=["aaa"];

io.on("connection",(socket)=>{
    console.log('Có người vừa kết nối:' + socket.id)
    socket.on("client-sent-Username",(data)=>{
        if(mangUser.indexOf(data)>=0){
            //fail
            socket.emit('server-send-dki-tbai')
        }else{
            //thanh cong
            mangUser.push(data);
            socket.Username = data;
            socket.emit('server-send-dki-thanhcong',data)
            io.sockets.emit("server-send-danhsach-Users",mangUser)
        }
    })
    socket.on("logout",()=>{
        mangUser.splice(
            mangUser.indexOf(socket.Username),1
        );
        socket.broadcast.emit('server-send-danhsach-Users',mangUser)
    });
    socket.on('toi-dang-go-chu',()=>{
        var s=(socket.Username + " đang nhập");
        io.sockets.emit('ai-do-dang-go-chu',s)
    })
    socket.on('toi-ngung-go-chu',()=>{
        io.sockets.emit("ai-do-ngung-go-chu")
    })
 
    socket.on("user-send-message",(data)=>{
        io.sockets.emit('user-send-message',{un:socket.Username,nd:data})
    })

})

app.get("/",(req,res)=>{
    res.render("trangchu")
}) 