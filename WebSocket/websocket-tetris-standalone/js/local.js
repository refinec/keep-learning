const Local = function () {
    // 游戏对象
    var game;
    // 绑定键盘事件 
    var bindKeyEvent = function () {
        document.onkeydown = function (e) {
            switch (e.code) {
                case "Space": // space-32
                    game.fall();
                    break;
                case "ArrowLeft": // left-37
                    game.left();
                    break;
                case "ArrowUp": // up-38
                    // game.up();
                    game.rotate();
                    break;
                case "ArrowRight": // right-39
                    game.right();
                    break;
                case "ArrowDown": // down-40
                    game.down();
                    break;
            }
        }
    }
    // 开始
    var start = function () {
        var doms = {
            gameDiv: document.getElementById("game"),
            nextDiv: document.getElementById("next")
        };
        game = new Game();
        game.init(doms);
        bindKeyEvent();
    };
    this.start = start;
}