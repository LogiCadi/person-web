// import { DataStore } from "./base/DataStore.js";
// import { UpPencil } from "./runtime/UpPencil.js";
// import { DownPencil } from "./runtime/DownPencil.js";

/**负责游戏的运行 */
 class Director {
// export class Director {
    constructor() {
        this.dataStore = DataStore.getInstance();
        // 物体平移 移动速度
        this.speed = 2;
    }
    // 全局对象
    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }

    /**创建一组铅笔 */
    createPencil() {
        let minTop = DataStore.getInstance().canvas.height / 8
        let maxTop = DataStore.getInstance().canvas.height / 2
        let top = minTop + Math.random() * (maxTop - minTop)
        this.dataStore.get('pencils').push(new UpPencil(top))
        this.dataStore.get('pencils').push(new DownPencil(top))
        // 缩小水管间隙
        this.dataStore.gap -= DataStore.getInstance().canvas.height / 120
        if (this.dataStore.gap <= DataStore.getInstance().canvas.height / 6) {
            this.dataStore.gap = DataStore.getInstance().canvas.height / 6
        }
    }

    /**小鸟上移 */
    birdUp() {
        const bird = this.dataStore.get('birds')
        // 上移距离 DataStore.getInstance().canvas.height / 10
        bird.downY = bird.y - DataStore.getInstance().canvas.height / 10
        bird.isUp = true
        bird.time = 0
    }

    /**小鸟碰撞检测与分数统计 */
    check() {
        const bird = this.dataStore.get('birds')
        const land = this.dataStore.get('land')
        const pencils = this.dataStore.get('pencils')

        // 碰撞陆地
        if (bird.y + bird.width >= land.y) {
            console.log('碰撞陆地，游戏结束')
            this.isGameOver = true
        }

        // 碰撞铅笔
        const birdBorder = {
            top: bird.y,
            bottom: bird.y + bird.height,
            left: bird.x,
            right: bird.x + bird.width
        }
        // 只需判断第一组铅笔
        const pencilBorder = {
            left: pencils[0].x,
            right: pencils[0].x + pencils[0].width,

            bottom: pencils[0].y + pencils[0].height,
            top: pencils[1].y,
        }
        if (birdBorder.right >= pencilBorder.left && birdBorder.left <= pencilBorder.right &&
            (birdBorder.top <= pencilBorder.bottom || birdBorder.bottom >= pencilBorder.top)) {
            console.log('碰撞水管，游戏结束')
            this.isGameOver = true
            return
        }

        // 通过障碍物 计算分数
        if (birdBorder.right >= pencilBorder.left && birdBorder.left <= pencilBorder.right) {
            this.dataStore.flag = true
        }
        if (this.dataStore.flag && birdBorder.left > pencilBorder.right) {
            this.dataStore.score++
            this.dataStore.flag = false
        }
    }

    run() {
        // 碰撞检测
        this.check()
        if (!this.isGameOver) {
            // 背景
            this.dataStore.get('background').draw();
            // 上下铅笔
            const pencils = this.dataStore.get('pencils')
            if (pencils[0].x + pencils[0].width <= 0) {
                // 第一组移出边界 移除第一组
                pencils.shift()
                pencils.shift()
            }

            if (pencils[0].x <= (DataStore.getInstance().canvas.width - pencils[0].width) / 2 && pencils.length == 2) {
                // 第一组移动到中间 增加第二组
                this.createPencil()
            }

            pencils.forEach(item => {
                item.draw()
            });

            // 陆地
            this.dataStore.get('land').draw();
            // 积分器
            this.dataStore.get('score').draw()
            // 小鸟
            this.dataStore.get('birds').draw()

            // 重复渲染动画效果 60Hz刷新率
            let timer = requestAnimationFrame(() => this.run());
            this.dataStore.put('timer', timer);
        } else {
            // 终止动画
            cancelAnimationFrame(this.dataStore.get('timer'))
            // 显示重新开始按钮
            this.dataStore.get('startButton').draw()
            // 销毁对象
            this.dataStore.destroy()
        }
    }
}