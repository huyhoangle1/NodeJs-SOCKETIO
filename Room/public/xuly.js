 var socket = io("http://localhost:3000/")
socket.on('server-send-rooms',(data)=>{
    $("#dsRoom").html('');
    data.map((r)=>{
        
        $("#dsRoom").append("<h4 class='room'>" + r + "</h4>")
    })
})
socket.on("server-chat",(data)=>{
    $("#right").append("<div>"+ data+ "<div>")
    // alert(data)
})
// socket.on((data)=>{
//     alert(data);
// })
socket.on('server-send-room-socket',(data)=>{
    $('#RoomHienTai').html(data)
})
$(document).ready(()=>{
    // alert("Huy Hoang")
    $("#btnTaoroom").click(()=>{
        socket.emit("tao-room",$("#txtRoom").val());
    })
    $("#btnChat").click(()=>{
        socket.emit("user-send-message",$("#txtMessages").val());
    })
})