class Square {
    // 方块数据
    constructor() {
        this.data = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        this.origin = {
            x: 0,
            y: 0
        };
        // 方向
        this.dir = 0;
    }
    canDown(isValid) {
        var test = {};
        test.x = this.origin.x + 1;
        test.y = this.origin.y;
        return isValid(test, this.data);
    }
    canUp(isValid) {
        var test = {};
        test.x = this.origin.x - 1;
        test.y = this.origin.y;
        return isValid(test, this.data);
    }
    canLeft(isValid) {
        var test = {};
        test.x = this.origin.x;
        test.y = this.origin.y - 1;
        return isValid(test, this.data);
    }
    canRight(isValid) {
        var test = {};
        test.x = this.origin.x;
        test.y = this.origin.y + 1;
        return isValid(test, this.data);
    }
    canRotate(isValid) {
        var d = (this.dir + 1) % 4;
        var test = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        for (let i = 0; i < this.data.length; i++) {
            for (let j = 0; j < this.data[0].length; j++) {
                test[i][j] = this.rotates[d][i][j];
            }
        }
        return isValid(this.origin, test);
    }
    down() {
        this.origin.x++;
    }
    up() {
        this.origin.x--;
    }
    left() {
        this.origin.y--;
    }
    right() {
        this.origin.y++;
    }
    rotate(num) {
        if (!num) num = 1;
        this.dir = (this.dir + num) % 4;
        for (let i = 0; i < this.data.length; i++) {
            for (let j = 0; j < this.data[0].length; j++) {
                this.data[i][j] = this.rotates[this.dir][i][j];
            }
        }
    }
}