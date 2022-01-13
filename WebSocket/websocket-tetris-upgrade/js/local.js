const Local = function (socket) {
    // 游戏对象
    var game;
    // 时间间隔
    var INTERVAL = 2000;
    // 定时器
    var timer = null;
    // 时间计数器
    var timeCount = 0;
    // 时间
    var time = 0;
    // 绑定键盘事件 
    var bindKeyEvent = function () {
        document.onkeydown = function (e) {
            switch (e.code) {
                case "Space": // space-32
                    game.fall();
                    socket.emit("fall");
                    break;
                case "ArrowLeft": // left-37
                    game.left();
                    socket.emit("left");
                    break;
                case "ArrowUp": // up-38
                    // game.up();
                    game.rotate();
                    socket.emit("rotate");
                    break;
                case "ArrowRight": // right-39
                    game.right();
                    socket.emit("right");
                    break;
                case "ArrowDown": // down-40
                    game.down();
                    socket.emit("down");
                    break;
            }
        }
    }
    // 移动
    var move = function () {
        timeFunc();
        if (!game.down()) {
            game.fixed();
            socket.emit("fixed");
            let line = game.checkClear();
            if (line) {
                game.addScore(line);
                socket.emit("line", line);
                if (line > 1) {
                    let bottomLines = generateBottomLine(line);
                    socket.emit("bottomLines", bottomLines);
                }
            }
            if (game.checkGameOver()) {
                game.gameover(false);
                document.getElementById("remote_gameover").innerHTML = "你赢了！";
                socket.emit("lose")
                stop();
            } else {
                let next_type = generateType();
                let next_dir = generateDir();
                game.performNext(next_type, next_dir);
                socket.emit("next", { type: next_type, dir: next_dir });
            }
        } else {
            socket.emit("down");
        }
    }
    // 生成干扰行
    var generateBottomLine = function (lineNum) { 
        let lines = [];
        for (let i = 0; i < lineNum; i++) {
            let line = [];
            for (let j = 0; j < 10; j++) {
                line.push(Math.ceil(Math.random() * 2) - 1)                
            }
            lines.push(line);
        }
        return lines;
     }
    // 记时函数
    var timeFunc = function() {
        timeCount++;
        if (timeCount == 5) {
            timeCount = 0;
            time++;
            game.setTime(time);
            socket.emit("time", time);
        }
    }
    // 随机生成一个方块种类
    var generateType = function () {
        return Math.ceil(Math.random() * 7) - 1;
    }
    // 随机生成一个旋转次数
    var generateDir = function () {
        return Math.ceil(Math.random() * 4) - 1;
    }
    // 开始
    var start = function () {
        var doms = {
            gameDiv: document.getElementById("local_game"),
            nextDiv: document.getElementById("local_next"),
            timeDiv: document.getElementById("local_time"),
            scoreDiv: document.getElementById("local_score"),
            resultDiv: document.getElementById("local_gameover"),
        };
        game = new Game();
        let type = generateType();
        let dir = generateDir();
        game.init(doms, type, dir);
        socket.emit("init", {type, dir})
        bindKeyEvent();
        let next_type = generateType();
        let next_dir = generateDir();
        game.performNext(next_type, next_dir);
        socket.emit("next", { type: next_type, dir: next_dir });
        timer = setInterval(move, INTERVAL);
    };
    // 结束
    var stop = function () {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
        document.onkeydown = null;
    }
    socket.on("start", function () { 
        document.getElementById("waiting").innerHTML = "";
        start();
    })
    socket.on("lose", function () { 
        game.gameover(true);
        stop();
    })
    socket.on("leave", function () {
        document.getElementById("local_gameover").innerHTML = "对方掉线";
        document.getElementById("remote_gameover").innerHTML = "已掉线";
        stop();
    })
    socket.on("bottomLines", function (data) { 
        game.addTailLines(data);
        socket.emit("addTailLines", data);
     })
}