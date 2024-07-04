// import { Sprite } from "../base/Sprite.js";
// import { DataStore } from "../base/DataStore.js"

 class Land extends Sprite {
// export class Land extends Sprite {
    constructor() {
        const image = Land.getImage('land')
        super(image,
            0, 0, image.width, image.height,
            0, DataStore.getInstance().canvas.height - image.height, DataStore.getInstance().canvas.width + 100, image.height)
    }
    
    draw() {
        this.x -= 2
        // 地板移动 循环
        if (-this.x > (this.width - DataStore.getInstance().canvas.width)) {
            this.x = 0
        }
        super.draw()
    }

}