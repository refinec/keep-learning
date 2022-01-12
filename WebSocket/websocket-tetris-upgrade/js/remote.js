const Remote = function (socket) {
    let game; // 游戏对象
    let bindEvents = function () {
        socket.on("init", function ({ type, dir }) {
            start(type, dir);
        });
        socket.on("next", function ({ type, dir }) {
            game.performNext(type, dir);
        })
    }
    let start = function (type, dir) {
        var doms = {
            gameDiv: document.getElementById("remote_game"),
            nextDiv: document.getElementById("remote_next"),
            timeDiv: document.getElementById("remote_time"),
            scoreDiv: document.getElementById("remote_score"),
            resultDiv: document.getElementById("remote_gameover"),
        };
        game = new Game();
        game.init(doms, type, dir);
    }
    bindEvents();
}