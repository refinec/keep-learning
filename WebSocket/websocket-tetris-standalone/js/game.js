const Game = function () {
    let gameDiv;
    let nextDiv;
    let timeDiv;
    let scoreDiv;
    let resultDiv;
    // 分数
    let score = 0;
    var gameData = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    var cur; // 当前方块
    var next; // 下一个方块
    var nextDivs = [];
    var gameDivs = [];
    var initDiv = function (container, data, divs) {
        for (let i = 0; i < data.length; i++) {
            let div = [];
            for (let j = 0; j < data[0].length; j++) {
                let newNode = document.createElement('div');
                newNode.className = 'none';
                newNode.style.top = (i * 20) + 'px';
                newNode.style.left = (j * 20) + 'px';
                container.appendChild(newNode);
                div.push(newNode);
            }
            divs.push(div);
        }
    }
    var refreshDiv = function (data, divs) {
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[0].length; j++) {
                if (data[i][j] == 0) {
                    divs[i][j].className = 'none'
                } else if (data[i][j] == 1) {
                    divs[i][j].className = 'done'
                } else if (data[i][j] == 2) {
                    divs[i][j].className = 'current'
                }
            }
        }
    }
    // 检测点是否合法
    var check = function (pos, x, y) {
        if (pos.x + x < 0) {
            return false;
        } else if (pos.x + x >= gameData.length) {
            return false;
        } else if (pos.y + y < 0) {
            return false;
        } else if (pos.y + y >= gameData[0].length) {
            return false;
        } else if (gameData[pos.x + x][pos.y + y] == 1) {
            return false;
        } else {
            return true;
        }
    }
    // 检测数据是否合法
    var isValid = function (pos, data) {
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[0].length; j++) {
                if (data[i][j] != 0) {
                    if (!check(pos, i, j)) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
    // 清除数据
    var clearData = function () {
        for (let i = 0; i < cur.data.length; i++) {
            for (let j = 0; j < cur.data[i].length; j++) {
                if (check(cur.origin, i, j)) {
                    gameData[cur.origin.x + i][cur.origin.y + j] = 0;
                }
            }
        }
    }
    // 设置数据
    var setData = function () {
        for (let i = 0; i < cur.data.length; i++) {
            for (let j = 0; j < cur.data[i].length; j++) {
                if (check(cur.origin, i, j)) {
                    gameData[cur.origin.x + i][cur.origin.y + j] = cur.data[i][j];
                }
            }
        }
    }
    // 下移
    var down = function () {
        if (cur.canDown(isValid)) {
            clearData();
            cur.down();
            setData();
            refreshDiv(gameData, gameDivs);
            return true; // 还能下降
        }
        return false; // 不能下降了
    }
    var up = function () {
        if (cur.canUp(isValid)) {
            clearData();
            cur.up();
            setData();
            refreshDiv(gameData, gameDivs);
        }
    }
    var left = function () {
        if (cur.canLeft(isValid)) {
            clearData();
            cur.left();
            setData();
            refreshDiv(gameData, gameDivs);
        }
    }
    var right = function () {
        if (cur.canRight(isValid)) {
            clearData();
            cur.right();
            setData();
            refreshDiv(gameData, gameDivs);
        }
    }
    var rotate = function () {
        if (cur.canRotate(isValid)) {
            clearData();
            cur.rotate();
            setData();
            refreshDiv(gameData, gameDivs);
        }
    }
    // 方块移动到底部，固定
    var fixed = function () {
        for (let i = 0; i < cur.data.length; i++) {
            for (let j = 0; j < cur.data[i].length; j++) {
                if (check(cur.origin, i, j)) {
                    if (gameData[cur.origin.x + i][cur.origin.y + j] == 2) {
                        gameData[cur.origin.x + i][cur.origin.y + j] = 1;
                    }
                }
            }
        }
        refreshDiv(gameData, gameDivs);
    }
    // 消行
    var checkClear = function () {
        var line = 0;
        for (let i = gameData.length - 1; i >= 0; i--) {
            let clear = true;
            for (let j = 0; j < gameData[0].length; j++) {
                if (gameData[i][j] != 1) {
                    clear = false;
                    break;
                }
            }
            if (clear) {
                line++;
                for (let m = i; m > 0; m--) {
                    for (let n = 0; n < gameData[0].length; n++) {
                        gameData[m][n] = gameData[m - 1][n];
                    }
                }
                for (let n = 0; n < gameData[0].length; n++) {
                    gameData[0][n] = 0;
                }
                i++;
            }
        }
        return line;
    }
    // 检查游戏结束
    var checkGameOver = function () {
        let gameOver = false;
        for (let i = 0; i < gameData[0].length; i++) {
            if (gameData[1][i] == 1) {
                gameOver = true;
            }
        }
        return gameOver;
    }
    // 下一个方块
    var performNext = function (type, dir) {
        cur = next;
        setData();
        next = SquareFactory.prototype.make(type, dir);
        refreshDiv(gameData, gameDivs);
        refreshDiv(next.data, nextDivs);
    }
    // 设置时间
    var setTime = function (time) {
        timeDiv.innerHTML = time;
    }
    // 分数
    var addScore = function (line) {
        let s = 0;
        switch (line) {
            case 1:
                s = 10;
                break;
            case 2:
                s = 30;
                break;
            case 3:
                s = 60;
                break;
            case 4:
                s = 100;
                break;
            default:
                break;
        }
        score = score + s;
        scoreDiv.innerHTML = score;
    }
    // 游戏结束
    var gameover = function (win) {
        resultDiv.innerHTML = win ? "你赢了！" : "你输了!";
    }
    // 底部增加行
    var addTailLines = function (lines) {
        for (let i = 0; i < gameData.length - lines.length; i++) {
            gameData[i] = gameData[i + lines.length];
        }
        for (let j = 0; j < lines.length; j++) {
            gameData[gameData.length - lines.length + j] = lines[j]            
        }
        cur.origin.x = cur.origin.x - lines.length;
        if (cur.origin.x < 0) {
            cur.origin.x = 0
        }
    }
    var init = function (doms, type, dir) {
        gameDiv = doms.gameDiv;
        nextDiv = doms.nextDiv;
        timeDiv = doms.timeDiv;
        scoreDiv = doms.scoreDiv;
        resultDiv = doms.resultDiv;
        const squareFactory = new SquareFactory();
        next = squareFactory.make(type, dir);
        initDiv(gameDiv, gameData, gameDivs);
        initDiv(nextDiv, next.data, nextDivs);
        refreshDiv(next.data, nextDivs);
    };
    this.init = init;
    this.down = down;
    this.up = up;
    this.left = left;
    this.right = right;
    this.rotate = rotate;
    this.fixed = fixed;
    this.performNext = performNext;
    this.checkClear = checkClear;
    this.checkGameOver = checkGameOver;
    this.setTime = setTime;
    this.addScore = addScore;
    this.gameover = gameover;
    this.addTailLines = addTailLines;
    this.fall = function () {
        while (down());
    };
}