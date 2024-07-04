// canvas在图片资源加载完毕后进行渲染
// import {Resources} from "./Resources.js";

 class ResourceLoader {
// export class ResourceLoader {
    constructor() {
        // 加载资源
        this.map = new Map(Resources)
        // value替换成image对象
        for (let [key, value] of this.map) {
            const image = new Image()
            image.src = value
            this.map.set(key, image)
        }
    }

    onLoaded(callback) {
        let count = 0
        for (const value of this.map.values()) {
            value.onload = () => {
                if(++count >= this.map.size){
                    callback && callback(this.map)
                }
            }
        }
    }

    static create(){
        return new ResourceLoader()
    }
}