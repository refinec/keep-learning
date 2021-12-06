const Local = function () {
    // 游戏对象
    var game;
    // 开始
    var start = function () {
        var doms = {
            gameDiv: document.getElementById("game"),
            nextDiv: document.getElementById("next")
        };
        game = new Game();
        game.init(doms);
    };
    this.start = start;
}