// import {Sprite} from '../base/Sprite.js';
// import {Director} from '../Director.js';
// import { DataStore } from "../base/DataStore.js"

 class Pencil extends Sprite {
// export class Pencil extends Sprite {
    constructor(image, top) {
        super(image,
            0, 0, image.width, image.height,
            DataStore.getInstance().canvas.width, 0, image.width, image.height);
        // top：上铅笔在视图上显示的高度
        this.top = top
    }

    draw() {
        this.x -= 2;
        super.draw();
    }
}