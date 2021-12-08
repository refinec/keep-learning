class Square {
    // 方块数据
    constructor() {
        this.data = [
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 0, 0]
        ];
        this.origin = {
            x: 0,
            y: 0
        }
    }
    canDown(isValid) {
        var test = {};
        test.x = this.origin.x + 1;
        test.y = this.origin.y;
        return isValid(test, this.data);
    }
    down() {
        this.origin.x++;
    }
}