// import { DataStore } from './js/base/Datastore.js'
// import { Background } from './js/sprite/Background.js';
// import { Director } from './js/Director.js';
// import { StartButton } from './js/sprite/StartButton.js';
// import { Score } from './js/sprite/Score.js';

// export class Main {
class Main {
    constructor() {
        this.dataStore = DataStore.getInstance()
        this.director = Director.getInstance()

        this.dataStore.canvas = document.getElementById('game-canvas')
        this.dataStore.ctx = this.dataStore.canvas.getContext('2d')
        this.init()
    }

    registerEvent() {
        // tap移动的方向 上下左右
        let startX, startY, moveX, moveY
        this.dataStore.canvas.addEventListener('touchstart', e => {
            if (this.director.isGameOver) {
                console.log('游戏开始')
                this.init()
            } else {

                startX = e.touches[0].clientX
                startY = e.touches[0].clientY

                this.dataStore.isTouch = true
                this.dataStore.canvas.addEventListener('touchmove', e => {
                    moveX = e.touches[0].clientX
                    moveY = e.touches[0].clientY

                    // 判断距离和角度
                    let x = moveX - startX
                    let y = startY - moveY
                    // 距离
                    let dis = Math.sqrt(x * x + y * y)
                    // 正弦
                    let sin = y / dis
                    // console.log(sin)
                    if (dis > 30) {
                        if (sin > Math.sin(-Math.PI / 4) && sin <= Math.sin(Math.PI / 4) && x > 0) {
                            this.director.moveBlock(1)
                        } else if (sin > Math.sin(Math.PI / 4) && sin <= 1) {
                            this.director.moveBlock(2)
                        } else if (sin > Math.sin(-Math.PI / 4) && sin <= Math.sin(Math.PI / 4) && x < 0) {
                            this.director.moveBlock(3)
                        } else if (sin > -1 && sin <= Math.sin(-Math.PI / 4)) {
                            this.director.moveBlock(4)
                        }
                    }
                })
            }
        })

    }

    init() {
        this.director.isGameOver = false
        this.dataStore.score = 0

        this.dataStore
            .put('background', Background)
            .put('score', Score)
            .put('block', new Map())
            .put('startButton', StartButton)

        // 在地图上随机创建两个block
        this.director.newBlock()
        this.director.newBlock()

        this.registerEvent()

        this.director.run()
    }

}


