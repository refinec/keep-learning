loadStatic(['./static/page2_text1.png', './static/page2_text2.png', './static/page2_text3.png', './static/page2_text4.png', './static/page2_text5.png', './static/page2_text6.png']).then((statics) => {
    console.log('statics[0]', statics[0])


    const playNext = genPlay();
    document.querySelector("#play")?.addEventListener("click", function () {
        playNext.next();
    })
    function* genPlay() {
        const fireSoundAudios: NodeListOf<HTMLAudioElement> = document.querySelectorAll("#fireSound audio") as NodeListOf<HTMLAudioElement>;
        while (true) {
            for (let i = 0; i < fireSoundAudios.length; i++) {
                const faudio = fireSoundAudios[i];
                faudio.play();
                faudio.muted = true;
                faudio.currentTime = i;
            }
            yield;
            for (let i = 0; i < fireSoundAudios.length; i++) {
                fireSoundAudios[i].pause();
            }
            yield;
        }
    }
    document.onload = function () {
        bgMusic();
        function bgMusic() {
            const fireSoundAudios: NodeListOf<HTMLAudioElement> = document.querySelectorAll("#fireSound audio") as NodeListOf<HTMLAudioElement>;
            for (let i = 0; i < fireSoundAudios.length; i++) {
                const faudio = fireSoundAudios[i];
                fireSoundAudios[i].play();
                // fireSoundAudios[i].volume = 0.2;
                fireSoundAudios[i].muted = true; // 默认静音
                fireSoundAudios[i].currentTime = i;
            }
        }
    }

    initFires();
    function initFires() {
        const canvas: HTMLCanvasElement = document.querySelector("#fires canvas") as HTMLCanvasElement;
        const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
        const fireSoundAudios: NodeListOf<HTMLAudioElement> = document.querySelectorAll("#fireSound audio") as NodeListOf<HTMLAudioElement>;
        const width = window.innerWidth;
        const height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        const balls: Array<Ball> = []; // 球的数量
        const fires: Array<Fire> = []; // 烟花
        let timer: number | undefined,
            count: number = 0,
            ballsAll: number = 5,
            textsAll: number = 5,
            textsPos: Array<{ x: number, y: number }> = [ // 其他祝福字的位置
                { x: width / 4, y: height / 4 + 30 },
                { x: width / 4 * 3, y: height / 4 - 30 },
                { x: width / 2, y: height / 2 },
                { x: width / 4, y: height / 4 * 3 },
                { x: width / 4 * 3, y: height / 4 * 3 + 50 },
            ];

        const textFires: Array<TextFire> = [];
        const points1: IPointArray = getImagePoints(statics[0], 4);// 获取图片像素点
        const points2: Array<IPointArray> = [];
        for (let i = 1; i < statics.length; i++) {
            points2.push(getImagePoints(statics[i], 4));
        }
        timer = setInterval(() => {
            if (count === ballsAll) {
                clearInterval(timer);
                count = 0;
                timer = undefined;
                balls.push(
                    new Ball({
                        r: 4,
                        x: width / 2,
                        y: height,
                        vx: 0,
                        vy: -10,
                        end() {
                            if (this.vy > 1) {
                                balls.splice(balls.indexOf(this), 1)

                                for (let i = 0; i < 60; i++) {
                                    let power = Math.random() * 10;
                                    let vx = Math.cos(i * 6 * Math.PI / 180) * power;
                                    let vy = Math.sin(i * 6 * Math.PI / 180) * power;
                                    fires.push(
                                        new Fire({
                                            r: 3,
                                            x: this.x, // 已 Ball 为中心点，
                                            y: this.y,
                                            vx: vx,
                                            vy: vy,
                                            g: 0.05,
                                            end() {
                                                if (this.life < 10) {
                                                    fires.splice(fires.indexOf(this), 1)
                                                }
                                            }
                                        })
                                    )
                                }

                                for (let i = 0; i < points1.length; i++) {
                                    const power = 0.05;
                                    const vx = (points1[i].x - points1.w / 2) * power;
                                    const vy = (points1[i].y - points1.h / 2) * power;
                                    textFires.push(
                                        new TextFire({
                                            x: this.x,
                                            y: this.y,
                                            vx: vx,
                                            vy: vy,
                                            g: 0.03,
                                            life: 200,
                                            r: 1,
                                            end() {
                                                if (this.life < 10) {
                                                    textFires.splice(textFires.indexOf(this), 1)
                                                }
                                            }
                                        })
                                    )
                                }

                                timer = setInterval(function () {
                                    if (count === textsAll) {
                                        clearInterval(timer);
                                        count = 0;
                                        timer = undefined;
                                        setTimeout(() => {
                                            let share: HTMLDivElement = document.querySelector("#share") as HTMLDivElement;
                                            share.style.display = "block";
                                        }, 2000)
                                    } else {
                                        count++;
                                        let nowPos: { x: number, y: number } = textsPos.pop() as { x: number, y: number };
                                        let power = 0.01;
                                        let vx = (nowPos.x - width / 2) * power;
                                        let vy = (nowPos.y - height) * power;
                                        balls.push(
                                            new Ball({
                                                x: width / 2, // 底部的中心点
                                                y: height,
                                                r: 3,
                                                vx: vx,
                                                vy: vy,
                                                tx: nowPos.x,
                                                ty: nowPos.y,
                                                index: count - 1,
                                                g: 0,
                                                end() {
                                                    if (this.y - this.ty < 0) {
                                                        balls.splice(balls.indexOf(this), 1);
                                                        for (let i = 0; i < 60; i++) {
                                                            let power = Math.random() * 10;
                                                            let vx = Math.cos(i * 6 * Math.PI / 180) * power;
                                                            let vy = Math.sin(i * 6 * Math.PI / 180) * power;
                                                            fires.push(
                                                                new Fire({
                                                                    r: 3,
                                                                    x: this.x, // 已 Ball 为中心点，
                                                                    y: this.y,
                                                                    vx: vx,
                                                                    vy: vy,
                                                                    g: 0,
                                                                    life: 300,
                                                                    end() {
                                                                        if (this.life < 10) {
                                                                            fires.splice(fires.indexOf(this), 1)
                                                                        }
                                                                    }
                                                                })
                                                            )
                                                        }
                                                        for (let i = 0; i < points2[this.index].length; i++) {
                                                            const power = 0.05;
                                                            const vx = (points2[this.index][i].x - points2[this.index].w / 2) * power;
                                                            const vy = (points2[this.index][i].y - points2[this.index].h / 2) * power;
                                                            textFires.push(
                                                                new TextFire({
                                                                    x: this.x,
                                                                    y: this.y,
                                                                    vx: vx,
                                                                    vy: vy,
                                                                    g: 0,
                                                                    life: 300,
                                                                    r: 1,
                                                                    fs: 0.92,
                                                                    end() {

                                                                    },
                                                                })
                                                            )
                                                        }
                                                    }
                                                },
                                            })
                                        )
                                    }
                                }, 300)

                            }
                        }
                    })
                )
            } else {
                count++;
                balls.push(
                    new Ball({
                        r: 3,
                        x: Math.random() * width / 3 + width / 3, // 小球出现在1/3处或2/3处
                        y: height,
                        vx: Math.random() * 2 - 1, // 在 -1 到 1之间
                        vy: - Math.random() * 2 - 10,
                        end() {
                            if (this.vy > 1) { // 小球往下走时, 把小球实例删除掉
                                balls.splice(balls.indexOf(this), 1);
                                // 爆发烟火
                                let size = Math.random() * 10;
                                for (let i = 0; i < 60; i++) {
                                    let power = Math.random() * size;
                                    let vx = Math.cos(i * 6 * Math.PI / 180) * power;
                                    let vy = Math.sin(i * 6 * Math.PI / 180) * power;
                                    fires.push(
                                        new Fire({
                                            r: 3,
                                            x: this.x, // 已 Ball 为中心点，
                                            y: this.y,
                                            vx: vx,
                                            vy: vy,
                                            g: 0.05,
                                            end() {
                                                if (this.life < 10) {
                                                    fires.splice(fires.indexOf(this), 1)
                                                }
                                            }
                                        })
                                    )
                                }
                            }
                        },
                    })
                )
            }
        }, 500);
        loop();
        function loop() {
            if (balls.length) {
                // 开启音频
                for (let i = 0; i < fireSoundAudios.length; i++) {
                    fireSoundAudios[i].muted = false;
                }

                ctx.fillStyle = 'rgba(184, 42, 30, 0.2)';
                ctx.fillRect(0, 0, width, height); // 蒙层，实现拖影
            } else {
                // 关闭音频
                for (let i = 0; i < fireSoundAudios.length; i++) {
                    fireSoundAudios[i].muted = true;
                }
                // 如果没有小球了，把拖影覆盖掉
                ctx.fillStyle = 'rgba(184, 42, 30)';
                ctx.fillRect(0, 0, width, height);
            }


            for (let i = 0; i < balls.length; i++) {
                balls[i].updated();
                balls[i].render();
            }

            for (let i = 0; i < fires.length; i++) {
                const fire = fires[i];
                fire.updated();
                fire.render();
            }
            for (let i = 0; i < textFires.length; i++) {
                const txt = textFires[i];
                txt.updated();
                txt.render();
            }
            requestAnimationFrame(loop)
        }
        class BaseBall implements ballSetting {
            settings: ballSetting;
            color: string; // 小球的颜色
            x: number; // 小球的 x轴 位置
            y: number; // 小球的 y轴 位置
            vx: number; // x轴 的速度
            vy: number; // y轴 的速度
            r: number; // 小球的半径
            g: number; // 小球的重力加速度
            fs: number;
            life: number;
            tx: number; // 目标x轴位置
            ty: number; // 目标y轴位置
            index: number;
            end: () => void;
            constructor(options: ballSetting) {
                this.settings = Object.assign({
                    color: 'yellow', // 小球的颜色
                    r: 5, // 小球的半径
                    g: 0.1, // 小球的重力加速度
                    end() { }
                }, options);
                for (const key in this.settings) {
                    if (Object.prototype.hasOwnProperty.call(this.settings, key)) {
                        this[key] = this.settings[key]
                    }
                }
            }
        }
        class Ball extends BaseBall {
            settings: ballSetting;
            x: number;
            y: number;
            vx: number;
            vy: number;
            g: number;
            end: () => void;
            constructor(options: ballSetting) {
                super(options);
            }
            updated() {
                this.x += this.vx;
                this.y += this.vy;
                this.vy += this.g;
            }
            render() {
                ctx.beginPath();
                ctx.fillStyle = this.color;
                ctx.arc(this.x, this.y, this.r, 0, 360 * Math.PI / 180); // 画圆
                ctx.closePath();
                ctx.fill();
                this.end();
            }
        }
        class Fire extends BaseBall {
            settings: ballSetting;
            keyof
            constructor(options: ballSetting) {
                super(Object.assign({
                    color: 'yellow', // 小球的颜色
                    r: 5, // 小球的半径
                    g: 0.1, // 小球的重力加速度
                    fs: 0.95, // 摩擦系数，让小球的速度损失的更快些
                    life: 100,
                    end() { }
                }, options))
            }
            updated() {
                this.x += this.vx;
                this.y += this.vy;
                this.vy += this.g;
                this.vx *= this.fs;
                this.vy *= this.fs;
                if (this.life > 0 && this.life < 300) {
                    this.life--;
                }
            }
            render() {
                ctx.beginPath();
                ctx.fillStyle = this.color;
                ctx.arc(this.x, this.y, this.r * Math.min(this.life, 100) / 100, 0, 360 * Math.PI / 180); // 画圆
                ctx.closePath();
                ctx.fill();
                this.end();
            }
        }


        interface IPointArray extends Array<any> {
            [index: number]: { x: number, y: number },
            w: number,
            h: number,
        }
        /**
         * 
         * @param img 
         * @param level 网格的级别：值越小，粒子就越多，值越大，粒子就越少
         */
        function getImagePoints(img, level = 5): IPointArray {
            const width = img.width;
            const height = img.height;
            const points: IPointArray = [];
            let x = Math.floor(width / level); // 网格 x轴的个数
            let y = Math.floor(height / level); // 网格 y轴的个数
            let imgData: ImageData;
            ctx.clearRect(0, 0, width, height);
            ctx.beginPath();
            ctx.drawImage(img, 0, 0);
            ctx.closePath();
            imgData = ctx.getImageData(0, 0, width, height);
            ctx.clearRect(0, 0, width, height);
            points.w = width;
            points.h = height;

            for (let i = 0; i < y; i++) {
                for (let j = 0; j < x; j++) {
                    let colors = getImageColor(imgData, j * level, i * level);
                    if (colors[0] === 255) {
                        points.push({
                            x: j * level,
                            y: i * level
                        })
                    }
                }
            }
            return points;
        }

        function getImageColor(imgData, x, y): Array<number> {
            const w = imgData.width;
            const h = imgData.height;
            const d = imgData.data;
            let colors: Array<number> = [];
            colors[0] = d[(w * y + x) * 4]; // r
            colors[1] = d[(w * y + x) * 4 + 1]; // g
            colors[2] = d[(w * y + x) * 4 + 2]; // b
            colors[3] = d[(w * y + x) * 4 + 3]; // a
            return colors;
        }

        class TextFire extends BaseBall {
            settings: ballSetting;
            constructor(options: ballSetting) {
                super(Object.assign({
                    color: 'yellow', // 小球的颜色
                    r: 5, // 小球的半径
                    g: 0.1, // 小球的重力加速度
                    fs: 0.95, // 摩擦系数，让小球的速度损失的更快些
                    life: 100,
                    end() { }
                }, options))
            }
            updated() {
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
            }
            render() {
                ctx.beginPath();
                ctx.fillStyle = this.color;
                ctx.arc(this.x, this.y, this.r * Math.min(this.life, 100) / 100, 0, 360 * Math.PI / 180); // 画圆
                ctx.closePath();
                ctx.fill();
                this.end();
            }
        }
    }

    interface ballSetting {
        color?: string, // 小球的颜色
        x: number, // 小球的 x轴 位置
        y: number, // 小球的 y轴 位置
        vx: number, // x轴 的速度
        vy: number, // y轴 的速度
        r?: number, // 小球的半径
        g?: number, // 小球的重力加速度
        fs?: number,
        life?: number,
        tx?: number, // 目标x轴位置
        ty?: number, // 目标y轴位置
        index?: number,
        end: () => void
    }
})
function loadStatic(arr) {
    let promises: Array<Promise<any>> = [];
    for (let i = 0; i < arr.length; i++) {
        let promise = new Promise(function (resolve, reject) {
            const img = new Image();
            img.src = arr[i];
            img.onload = function () {
                resolve(img);
            }
            img.onerror = function (e) {
                reject(e)
            }
        })
        promises.push(promise);
    }
    return Promise.all(promises);
}