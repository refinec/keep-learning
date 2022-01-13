const app = require("http").createServer();
const io = require("socket.io")(app, { cors: true }); // cors:true 跨域
const PORT = 3000;
const socketMap = {}; // 存储客户端socket
var clientCount = 0; // 客户端计数
app.listen(PORT);

const bindListener = function (socket, event) {
    socket.on(event, function (data) {
        if (socket.clientNum % 2 == 0) {
            if (socketMap[socket.clientNum - 1]) {
                socketMap[socket.clientNum - 1].emit(event, data);
            }
        } else {
            if (socketMap[socket.clientNum + 1]) {
                socketMap[socket.clientNum + 1].emit(event, data);
            }
        }
    });
}
io.on("connection", function (socket) {
    clientCount++;
    socket.clientNum = clientCount;
    socketMap[clientCount] = socket;
    if (clientCount % 2 == 1) { // 如果用户是第一个进来，需要等待另一个用户配对
        socket.emit("waiting", "waiting for another person!!!");
    } else { // 否则， 开始游戏
        if (socketMap[clientCount - 1]) {
            socket.emit("start");
            socketMap[clientCount - 1].emit("start");
        } else {
            socket.emit("leave");
        }
    }
    bindListener(socket, "init");
    bindListener(socket, "next");
    bindListener(socket, "fall");
    bindListener(socket, "left");
    bindListener(socket, "rotate");
    bindListener(socket, "right");
    bindListener(socket, "down");
    bindListener(socket, "fixed");
    bindListener(socket, "line");
    bindListener(socket, "time");
    bindListener(socket, "lose");
    bindListener(socket, "bottomLines");
    bindListener(socket, "addTailLines");

    socket.on("disconnect", function () {
        if (socket.clientNum % 2 == 0) {
            if (socketMap[socket.clientNum - 1]) {
                socketMap[socket.clientNum - 1].emit("leave");
            }
        } else {
            if (socketMap[socket.clientNum + 1]) {
                socketMap[socket.clientNum + 1].emit("leave");
            }
        }
        delete (socketMap[socket.clientNum]);
    })
})

console.log("webSocket server listening on port: ", PORT);
