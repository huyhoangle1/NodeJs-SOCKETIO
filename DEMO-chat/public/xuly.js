var socket =io('http://localhost:3000/')
socket.on('server-send-dki-tbai',()=>{
alert('Sai username , Đã có người đăng kí rồi !!!!')
});
socket.on('server-send-dki-thanhcong',(data)=>{
    $('#currentUser').html(data);
    $("#loginForm").hide(2000);
    $("#chatForm").show(1000);
});
socket.on('user-send-message',(data)=>{
    $("#listMessages").append("<div class='ms'>"+ data.un+":"+data.nd+"</div>" )
});
socket.on("ai-do-dang-go-chu",(data)=>{
    $("#thongbao").html("<img src='message.png'>" +data);
});
socket.on("ai-do-ngung-go-chu",()=>{
    $("#thongbao").html("");
});



socket.on('server-send-danhsach-Users',(data)=>{
    $("#boxContent").html("");
    data.forEach((i) => {
        $("#boxContent").append("<div class='user'>" + i +"</div>")
    });
})
$(document).ready(()=>{
    $("#loginForm").show();
    $("#chatForm").hide();
    $("#btnRegister").click(()=>{
        socket.emit("client-sent-Username",$("#txtUsername").val())
    })
    $("#btnLayout").click(()=>{
        socket.emit("logout");
        $("#chatForm").hide(2000);
        $("#loginForm").show(1000);  
    })
    $("#txtMessages").focusin(function() { 
       socket.emit('toi-dang-go-chu')
        
    });
    $("#txtMessages").focusout(function() { 
       socket.emit('toi-ngung-go-chu')
        
    });
    $('#btnSend').click(()=>{
        socket.emit("user-send-message",$("#txtMessages").val());
    })
})
