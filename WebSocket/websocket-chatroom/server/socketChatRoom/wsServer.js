const app = require("http").createServer();
const io = require("socket.io")(app);
const PORT = 3000;
var clientCount = 0;

app.listen(PORT);
io.on("connection", function (socket) {
    clientCount++;
    socket.nickname = 'user' + clientCount;
    io.emit("enter", socket.nickname + " comes in!"); // 向所有连接者广播

    socket.on("message", function (str) { // 接收消息
        io.emit("message", socket.nickname + " says: " + str);
    });
    socket.on("disconnect", function () { // 断开连接
        io.emit("leave", socket.nickname + " left!")
    })
})
console.log("webSocket server listening on port: ", PORT);
