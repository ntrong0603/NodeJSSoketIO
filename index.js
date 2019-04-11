const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use(express.static("./public"));
app.set("view engine", "ejs");
app.set("views", "./views");
server.listen(3000);

//lang nghe su kien ket noi
io.on("connection", function(socket){
    console.log(socket.id);

    //lang nghe su kien ngat ket noi
    socket.on('disconnect', function () {
        console.log(socket.id + " disconnect");
    });

    //lay ket qua
    socket.on('Client-send-data', function (data) {
        console.log(data);
        //lay ket qua phat cho tat ca cac ket noi
        io.sockets.emit("Server-send-data", data + "888");
    });

   
});

app.get("/", function(req, res){
    res.render('trangchu');
});
