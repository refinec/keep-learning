const Remote = function (socket) {
    let game; // 游戏对象
    let bindEvents = function () {
        socket.on("init", function ({ type, dir }) {
            start(type, dir);
        });
        socket.on("next", function ({ type, dir }) {
            game.performNext(type, dir);
        })

        socket.on("fall", function () {
            game.fall();
        })
        socket.on("left", function () {
            game.left();
        })
        socket.on("rotate", function () {
            game.rotate();
        })
        socket.on("right", function () {
            game.right();
        })
        socket.on("down", function () {
            game.down();
        })
        socket.on("fixed", function () {
            game.fixed();
        })
        socket.on("line", function (data) {
            game.checkClear();
            game.addScore(data)
        })
        socket.on("time", function (time) {
            game.setTime(time);
        })
        socket.on("lose", function () {
            game.gameover(false);
        })
        socket.on("addTailLines", function () {
            game.addTailLines(data);
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