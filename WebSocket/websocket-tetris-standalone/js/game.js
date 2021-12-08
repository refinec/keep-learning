const Game = function () {
    let gameDiv;
    let nextDiv;
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
        if(cur.canDown(isValid)) {
            clearData();
            cur.down();
            setData();
            refreshDiv(gameData, gameDivs);
        }
    }
    // var up = function () {

    // }
    // var left = function () {

    // }
    // var right = function () {

    // }
    // var space = function () {

    // }
    var init = function (doms) {
        gameDiv = doms.gameDiv;
        nextDiv = doms.nextDiv;
        cur = new Square();
        next = new Square();
        initDiv(gameDiv, gameData, gameDivs);
        initDiv(nextDiv, next.data, nextDivs);
        cur.origin.x = 0;
        cur.origin.y = 6;
        setData();
        refreshDiv(gameData, gameDivs);
        refreshDiv(next.data, nextDivs);
    };
    this.init = init;
    this.down = down;
}