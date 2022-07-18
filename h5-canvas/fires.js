var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
loadStatic(['./static/page2_text1.png', './static/page2_text2.png', './static/page2_text3.png', './static/page2_text4.png', './static/page2_text5.png', './static/page2_text6.png']).then(function (statics) {
    var _a;
    console.log('statics[0]', statics[0]);
    var playNext = genPlay();
    (_a = document.querySelector("#play")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
        playNext.next();
    });
    function genPlay() {
        var fireSoundAudios, i, faudio, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fireSoundAudios = document.querySelectorAll("#fireSound audio");
                    _a.label = 1;
                case 1:
                    if (!true) return [3 /*break*/, 4];
                    for (i = 0; i < fireSoundAudios.length; i++) {
                        faudio = fireSoundAudios[i];
                        faudio.play();
                        faudio.muted = true;
                        faudio.currentTime = i;
                    }
                    return [4 /*yield*/];
                case 2:
                    _a.sent();
                    for (i = 0; i < fireSoundAudios.length; i++) {
                        fireSoundAudios[i].pause();
                    }
                    return [4 /*yield*/];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    }
    document.onload = function () {
        bgMusic();
        function bgMusic() {
            var fireSoundAudios = document.querySelectorAll("#fireSound audio");
            for (var i = 0; i < fireSoundAudios.length; i++) {
                var faudio = fireSoundAudios[i];
                fireSoundAudios[i].play();
                // fireSoundAudios[i].volume = 0.2;
                fireSoundAudios[i].muted = true; // 默认静音
                fireSoundAudios[i].currentTime = i;
            }
        }
    };
    initFires();
    function initFires() {
        var canvas = document.querySelector("#fires canvas");
        var ctx = canvas.getContext("2d");
        var fireSoundAudios = document.querySelectorAll("#fireSound audio");
        var width = window.innerWidth;
        var height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        var balls = []; // 球的数量
        var fires = []; // 烟花
        var timer, count = 0, ballsAll = 5, textsAll = 5, textsPos = [
            { x: width / 4, y: height / 4 + 30 },
            { x: width / 4 * 3, y: height / 4 - 30 },
            { x: width / 2, y: height / 2 },
            { x: width / 4, y: height / 4 * 3 },
            { x: width / 4 * 3, y: height / 4 * 3 + 50 },
        ];
        var textFires = [];
        var points1 = getImagePoints(statics[0], 4); // 获取图片像素点
        var points2 = [];
        for (var i = 1; i < statics.length; i++) {
            points2.push(getImagePoints(statics[i], 4));
        }
        timer = setInterval(function () {
            if (count === ballsAll) {
                clearInterval(timer);
                count = 0;
                timer = undefined;
                balls.push(new Ball({
                    r: 4,
                    x: width / 2,
                    y: height,
                    vx: 0,
                    vy: -10,
                    end: function () {
                        if (this.vy > 1) {
                            balls.splice(balls.indexOf(this), 1);
                            for (var i = 0; i < 60; i++) {
                                var power = Math.random() * 10;
                                var vx = Math.cos(i * 6 * Math.PI / 180) * power;
                                var vy = Math.sin(i * 6 * Math.PI / 180) * power;
                                fires.push(new Fire({
                                    r: 3,
                                    x: this.x,
                                    y: this.y,
                                    vx: vx,
                                    vy: vy,
                                    g: 0.05,
                                    end: function () {
                                        if (this.life < 10) {
                                            fires.splice(fires.indexOf(this), 1);
                                        }
                                    }
                                }));
                            }
                            for (var i = 0; i < points1.length; i++) {
                                var power = 0.05;
                                var vx = (points1[i].x - points1.w / 2) * power;
                                var vy = (points1[i].y - points1.h / 2) * power;
                                textFires.push(new TextFire({
                                    x: this.x,
                                    y: this.y,
                                    vx: vx,
                                    vy: vy,
                                    g: 0.03,
                                    life: 200,
                                    r: 1,
                                    end: function () {
                                        if (this.life < 10) {
                                            textFires.splice(textFires.indexOf(this), 1);
                                        }
                                    }
                                }));
                            }
                            timer = setInterval(function () {
                                if (count === textsAll) {
                                    clearInterval(timer);
                                    count = 0;
                                    timer = undefined;
                                    setTimeout(function () {
                                        var share = document.querySelector("#share");
                                        share.style.display = "block";
                                    }, 2000);
                                }
                                else {
                                    count++;
                                    var nowPos = textsPos.pop();
                                    var power = 0.01;
                                    var vx = (nowPos.x - width / 2) * power;
                                    var vy = (nowPos.y - height) * power;
                                    balls.push(new Ball({
                                        x: width / 2,
                                        y: height,
                                        r: 3,
                                        vx: vx,
                                        vy: vy,
                                        tx: nowPos.x,
                                        ty: nowPos.y,
                                        index: count - 1,
                                        g: 0,
                                        end: function () {
                                            if (this.y - this.ty < 0) {
                                                balls.splice(balls.indexOf(this), 1);
                                                for (var i = 0; i < 60; i++) {
                                                    var power_1 = Math.random() * 10;
                                                    var vx_1 = Math.cos(i * 6 * Math.PI / 180) * power_1;
                                                    var vy_1 = Math.sin(i * 6 * Math.PI / 180) * power_1;
                                                    fires.push(new Fire({
                                                        r: 3,
                                                        x: this.x,
                                                        y: this.y,
                                                        vx: vx_1,
                                                        vy: vy_1,
                                                        g: 0,
                                                        life: 300,
                                                        end: function () {
                                                            if (this.life < 10) {
                                                                fires.splice(fires.indexOf(this), 1);
                                                            }
                                                        }
                                                    }));
                                                }
                                                for (var i = 0; i < points2[this.index].length; i++) {
                                                    var power_2 = 0.05;
                                                    var vx_2 = (points2[this.index][i].x - points2[this.index].w / 2) * power_2;
                                                    var vy_2 = (points2[this.index][i].y - points2[this.index].h / 2) * power_2;
                                                    textFires.push(new TextFire({
                                                        x: this.x,
                                                        y: this.y,
                                                        vx: vx_2,
                                                        vy: vy_2,
                                                        g: 0,
                                                        life: 300,
                                                        r: 1,
                                                        fs: 0.92,
                                                        end: function () {
                                                        }
                                                    }));
                                                }
                                            }
                                        }
                                    }));
                                }
                            }, 300);
                        }
                    }
                }));
            }
            else {
                count++;
                balls.push(new Ball({
                    r: 3,
                    x: Math.random() * width / 3 + width / 3,
                    y: height,
                    vx: Math.random() * 2 - 1,
                    vy: -Math.random() * 2 - 10,
                    end: function () {
                        if (this.vy > 1) { // 小球往下走时, 把小球实例删除掉
                            balls.splice(balls.indexOf(this), 1);
                            // 爆发烟火
                            var size = Math.random() * 10;
                            for (var i = 0; i < 60; i++) {
                                var power = Math.random() * size;
                                var vx = Math.cos(i * 6 * Math.PI / 180) * power;
                                var vy = Math.sin(i * 6 * Math.PI / 180) * power;
                                fires.push(new Fire({
                                    r: 3,
                                    x: this.x,
                                    y: this.y,
                                    vx: vx,
                                    vy: vy,
                                    g: 0.05,
                                    end: function () {
                                        if (this.life < 10) {
                                            fires.splice(fires.indexOf(this), 1);
                                        }
                                    }
                                }));
                            }
                        }
                    }
                }));
            }
        }, 500);
        loop();
        function loop() {
            if (balls.length) {
                // 开启音频
                for (var i = 0; i < fireSoundAudios.length; i++) {
                    fireSoundAudios[i].muted = false;
                }
                ctx.fillStyle = 'rgba(184, 42, 30, 0.2)';
                ctx.fillRect(0, 0, width, height); // 蒙层，实现拖影
            }
            else {
                // 关闭音频
                for (var i = 0; i < fireSoundAudios.length; i++) {
                    fireSoundAudios[i].muted = true;
                }
                // 如果没有小球了，把拖影覆盖掉
                ctx.fillStyle = 'rgba(184, 42, 30)';
                ctx.fillRect(0, 0, width, height);
            }
            for (var i = 0; i < balls.length; i++) {
                balls[i].updated();
                balls[i].render();
            }
            for (var i = 0; i < fires.length; i++) {
                var fire = fires[i];
                fire.updated();
                fire.render();
            }
            for (var i = 0; i < textFires.length; i++) {
                var txt = textFires[i];
                txt.updated();
                txt.render();
            }
            requestAnimationFrame(loop);
        }
        var BaseBall = /** @class */ (function () {
            function BaseBall(options) {
                this.settings = Object.assign({
                    color: 'yellow',
                    r: 5,
                    g: 0.1,
                    end: function () { }
                }, options);
                for (var key in this.settings) {
                    if (Object.prototype.hasOwnProperty.call(this.settings, key)) {
                        this[key] = this.settings[key];
                    }
                }
            }
            return BaseBall;
        }());
        var Ball = /** @class */ (function (_super) {
            __extends(Ball, _super);
            function Ball(options) {
                return _super.call(this, options) || this;
            }
            Ball.prototype.updated = function () {
                this.x += this.vx;
                this.y += this.vy;
                this.vy += this.g;
            };
            Ball.prototype.render = function () {
                ctx.beginPath();
                ctx.fillStyle = this.color;
                ctx.arc(this.x, this.y, this.r, 0, 360 * Math.PI / 180); // 画圆
                ctx.closePath();
                ctx.fill();
                this.end();
            };
            return Ball;
        }(BaseBall));
        var Fire = /** @class */ (function (_super) {
            __extends(Fire, _super);
            function Fire(options) {
                return _super.call(this, Object.assign({
                    color: 'yellow',
                    r: 5,
                    g: 0.1,
                    fs: 0.95,
                    life: 100,
                    end: function () { }
                }, options)) || this;
            }
            Fire.prototype.updated = function () {
                this.x += this.vx;
                this.y += this.vy;
                this.vy += this.g;
                this.vx *= this.fs;
                this.vy *= this.fs;
                if (this.life > 0 && this.life < 300) {
                    this.life--;
                }
            };
            Fire.prototype.render = function () {
                ctx.beginPath();
                ctx.fillStyle = this.color;
                ctx.arc(this.x, this.y, this.r * Math.min(this.life, 100) / 100, 0, 360 * Math.PI / 180); // 画圆
                ctx.closePath();
                ctx.fill();
                this.end();
            };
            return Fire;
        }(BaseBall));
        /**
         *
         * @param img
         * @param level 网格的级别：值越小，粒子就越多，值越大，粒子就越少
         */
        function getImagePoints(img, level) {
            if (level === void 0) { level = 5; }
            var width = img.width;
            var height = img.height;
            var points = [];
            var x = Math.floor(width / level); // 网格 x轴的个数
            var y = Math.floor(height / level); // 网格 y轴的个数
            var imgData;
            ctx.clearRect(0, 0, width, height);
            ctx.beginPath();
            ctx.drawImage(img, 0, 0);
            ctx.closePath();
            imgData = ctx.getImageData(0, 0, width, height);
            ctx.clearRect(0, 0, width, height);
            points.w = width;
            points.h = height;
            for (var i = 0; i < y; i++) {
                for (var j = 0; j < x; j++) {
                    var colors = getImageColor(imgData, j * level, i * level);
                    if (colors[0] === 255) {
                        points.push({
                            x: j * level,
                            y: i * level
                        });
                    }
                }
            }
            return points;
        }
        function getImageColor(imgData, x, y) {
            var w = imgData.width;
            var h = imgData.height;
            var d = imgData.data;
            var colors = [];
            colors[0] = d[(w * y + x) * 4]; // r
            colors[1] = d[(w * y + x) * 4 + 1]; // g
            colors[2] = d[(w * y + x) * 4 + 2]; // b
            colors[3] = d[(w * y + x) * 4 + 3]; // a
            return colors;
        }
        var TextFire = /** @class */ (function (_super) {
            __extends(TextFire, _super);
            function TextFire(options) {
                return _super.call(this, Object.assign({
                    color: 'yellow',
                    r: 5,
                    g: 0.1,
                    fs: 0.95,
                    life: 100,
                    end: function () { }
                }, options)) || this;
            }
            TextFire.prototype.updated = function () {
                this.x += this.vx;
                this.y += this.vy;
                if (this.life < 100) {
                    this.vy += this.g;
                }
                this.vx *= this.fs;
                this.vy *= this.fs;
                if (this.life > 0 && this.life < 300) {
                    this.life--;
                }
            };
            TextFire.prototype.render = function () {
                ctx.beginPath();
                ctx.fillStyle = this.color;
                ctx.arc(this.x, this.y, this.r * Math.min(this.life, 100) / 100, 0, 360 * Math.PI / 180); // 画圆
                ctx.closePath();
                ctx.fill();
                this.end();
            };
            return TextFire;
        }(BaseBall));
    }
});
function loadStatic(arr) {
    var promises = [];
    var _loop_1 = function (i) {
        var promise = new Promise(function (resolve, reject) {
            var img = new Image();
            img.src = arr[i];
            img.onload = function () {
                resolve(img);
            };
            img.onerror = function (e) {
                reject(e);
            };
        });
        promises.push(promise);
    };
    for (var i = 0; i < arr.length; i++) {
        _loop_1(i);
    }
    return Promise.all(promises);
}
