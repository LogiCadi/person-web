// import { DataStore } from "../base/Datastore.js";

 class Background {
// export class Background {
    constructor() {

    }

    draw() {
        const ctx = DataStore.getInstance().ctx
        const canvas = DataStore.getInstance().canvas

        ctx.fillStyle = '#cdc5bd'
        ctx.fillRect(
            canvas.width * .05,
            canvas.height - canvas.width * 1.2,
            canvas.width * .9,
            canvas.width * .9)

        ctx.strokeStyle = '#bbada0'
        ctx.lineJoin = "round";
        ctx.beginPath();
        ctx.lineWidth = "6";
        for (let i = 0; i < 5; i++) {
            // 横线
            ctx.moveTo(canvas.width * .05 - 3,
                canvas.height - canvas.width * 1.2 + canvas.width * .9 / 4 * i);
            ctx.lineTo(canvas.width * .05 + canvas.width * .9 + 3,
                canvas.height - canvas.width * 1.2 + canvas.width * .9 / 4 * i);
            // 竖线
            ctx.moveTo(canvas.width * .05 + canvas.width * .9 / 4 * i,
                canvas.height - canvas.width * 1.2 - 3);
            ctx.lineTo(canvas.width * .05 + canvas.width * .9 / 4 * i,
                canvas.height - canvas.width * 1.2 + canvas.width * .9 + 3);
        }

        ctx.stroke();
    }
}