const socket = io("ws://localhost:3000");
const local = new Local(socket);
const remote = new Remote(socket);
socket.on("waiting", function (mes) {
    document.getElementById("waiting").innerHTML = mes;
})