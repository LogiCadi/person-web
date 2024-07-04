// import { ResourceLoader } from "./js/base/ResourceLoader.js";
// import { Director } from "./js/Director.js";
// import { DataStore } from "./js/base/DataStore.js";
// import { BackGround } from "./js/runtime/BackGround.js";
// import { Land } from "./js/runtime/Land.js";
// import { Birds } from "./js/player/Birds.js";
// import { StartButton } from "./js/player/StartButton.js";
// import { Score } from "./js/player/Score.js";

/**作为游戏开始的入口 */
 class Main {
// export class Main {
    constructor() {
        this.dataStore = DataStore.getInstance();
        this.director = Director.getInstance()

        this.dataStore.canvas = document.getElementById('game-canvas');
        this.dataStore.ctx = this.dataStore.canvas.getContext('2d');

        const loader = ResourceLoader.create();
        // 图片加载完成
        loader.onLoaded(map => {
            this.onFirstLoaded(map);
        });

    }

    /**资源第一次加载完成 */
    onFirstLoaded(map) {
        // 资源map
        this.dataStore.res = map;
        this.init();
    }
    /**绑定事件 */
    registerEvent() {
        /**点击屏幕 */
        this.dataStore.canvas.addEventListener('touchstart', e => {
            e.preventDefault()
            if (this.director.isGameOver) {
                // 游戏结束，点击重新开始
                console.log('游戏开始')
                this.init()
            } else {
                // 点击让小鸟飞起来
                this.director.birdUp()
            }
        })
    }
    init() {
        this.director.isGameOver = false
        this.dataStore.score = 0
        this.dataStore.gap = DataStore.getInstance().canvas.height / 3
        
        this.dataStore
            .put('background', BackGround)
            .put('land', Land)
            .put('pencils', [])
            .put('birds', Birds)
            .put('startButton', StartButton)
            .put('score', Score)
        // 创建一组铅笔
        this.director.createPencil()
        // 绑定事件
        this.registerEvent()

        this.director.run();
    }
}