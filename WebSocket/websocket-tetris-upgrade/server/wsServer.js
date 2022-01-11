const app = require("http").createServer();
const io = require("socket.io")(app, { cors: true }); // cors:true 跨域
const PORT = 3000;
const socketMap = {}; // 存储客户端socket
var clientCount = 0; // 客户端计数


app.listen(PORT);
io.on("connection", function (socket) { 
    clientCount++;
    socket.clientNum = clientCount;
    socketMap[clientCount] = socket;
    if (clientCount % 2 == 1) { // 如果用户是第一个进来，需要等待另一个用户配对
        socket.emit("waiting", "waiting for another person!!!");
    } else { // 否则， 开始游戏
        socket.emit("start");
        socketMap[clientCount - 1].emit("start");
    }
    socket.on("message", function () { });
    socket.on("disconnect", function () {  })
 })

console.log("webSocket server listening on port: ", PORT);
