var socket =io('http://localhost:3000/')
socket.on('server-send-dki-tbai',()=>{
alert('Sai username , Đã có người đăng kí rồi !!!!')
});
socket.on('server-send-dki-thanhcong',(data)=>{
    $('#currentUser').html(data);
    $("#txtUsername").hide(1000);
    $("#btnRegister").hide(1000);
    
});
socket.on('user-send-message',(data)=>{
    // var hoten= "<span class='hoten'> " + data.Username +": </span>";
    // var msg= "<span class='msg'> " + data.msg +": </span>";
    // $("#listMessages").append(hoten + msg +"<div class='block'></div>")
    $("#listMessages").append("<div class='tttt'>"+
        "<div class='ms'>"+ data.un+"</div>" +`:&nbsp `+ "<div class='mss'>"+ data.nd+"</div>")
        +"</div>"
    // `"<div class='mss'>"`+":"+data.nd+"</div>" )
});
socket.on("ai-do-dang-go-chu",(data)=>{
    $("#thongbao").html("" +data);
    // $("#thongbao").html("<img src='2.png'>" +data);
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
    $("#btnRegister").click(()=>{
        socket.emit("client-sent-Username",$("#txtUsername").val())
    })
    $("#btnLayout").click(()=>{
        socket.emit("logout");
   

    })
    $("#btnLayout").click(()=>{
        location.reload()
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
