const ws = require("nodejs-websocket")
const SERVER_PORT = 3000;
var clientCount = 0; // 客户端连接数量
const server = ws.createServer(conn => {
    console.log("WS Connection!!!", conn)
    clientCount++;
    conn.nickname = "user" + clientCount;
    let mes = {
        type: "enter",
        data: conn.nickname + "comes in!!!"
    };
    broadcast(JSON.stringify(mes));
    conn.on("text", str => {
        console.log("Received " + str)
        // conn.sendText(conn.nickname + "says:" + str.toUpperCase() + "!!!");
        let mes = {
            type: "message",
            data: conn.nickname + "says:" + str
        };
        broadcast(JSON.stringify(mes));
    })
    conn.on("close", (code, reason) => {
        let mes = {
            type: "leave",
            data: conn.nickname + " left!!!"
        };
        broadcast(JSON.stringify(mes));
        clientCount--;
        console.log("WS Connection closed!!!", code, reason);
    })
    conn.on("error", errObj => {
        console.error("WS error:", errObj);
    })
}).listen(SERVER_PORT);

console.log("webSocket server listening on port: ", SERVER_PORT);

function broadcast(msg) {
    // server.connections 表示 ws 所连接的数量
    server.connections.forEach(connection => {
        connection.sendText(msg);
    })
}