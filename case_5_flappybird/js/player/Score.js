// import { DataStore } from "../base/DataStore.js";

 class Score {
// export class Score {
    constructor() {
        this.ctx = DataStore.getInstance().ctx
    }
    draw() {
        this.ctx.font = '25px Arial'
        this.ctx.fillStyle = '#fff'
        this.ctx.fillText(DataStore.getInstance().score, DataStore.getInstance().canvas.width / 2, DataStore.getInstance().canvas.height / 7)
    }
}