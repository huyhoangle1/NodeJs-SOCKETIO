var socket = io("http://localhost:3000/")
socket.on('server-send-rooms',(data)=>{
    data.map((r)=>{
        $("#dsRoom").append("<h4>" + r + "</h4>")
    })
})

$(document).ready(()=>{
    // alert("Huy Hoang")
    $("#btnTaoroom").click(()=>{
        socket.emit("tao-room",$("#txtRoom").val());
    })
})