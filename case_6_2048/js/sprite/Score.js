// import { DataStore } from '../base/Datastore.js'

 class Score {
// export class Score {
    constructor() {
        this.dataStore = DataStore.getInstance()
    }

    draw() {

        this.drawPanel()
        this.drawScore()

    }

    // 绘制面板
    drawPanel() {
        const canvas = this.dataStore.canvas
        const ctx = this.dataStore.ctx

        ctx.fillStyle = '#bcab9f'
        // 圆角幅度
        let arc = 10

        ctx.beginPath()
        ctx.moveTo(canvas.width / 2, canvas.height * .08)

        ctx.arcTo(
            (canvas.width - canvas.width * .4) / 2 + canvas.width * .4,
            canvas.height * .08,
            (canvas.width - canvas.width * .4) / 2 + canvas.width * .4,
            canvas.height * .08 + arc,
            arc)
        ctx.arcTo(
            (canvas.width - canvas.width * .4) / 2 + canvas.width * .4,
            canvas.height * .08 + canvas.width * .3,
            (canvas.width - canvas.width * .4) / 2 + canvas.width * .4 - arc,
            canvas.height * .08 + canvas.width * .3,
            arc)
        ctx.arcTo(
            (canvas.width - canvas.width * .4) / 2,
            canvas.height * .08 + canvas.width * .3,
            (canvas.width - canvas.width * .4) / 2,
            canvas.height * .08 + canvas.width * .3 - arc,
            arc)
        ctx.arcTo(
            (canvas.width - canvas.width * .4) / 2,
            canvas.height * .08,
            (canvas.width - canvas.width * .4) / 2 + arc,
            canvas.height * .08,
            arc)
        ctx.closePath()

        ctx.fill()
    }

    // 显示数字
    drawScore() {
        const canvas = this.dataStore.canvas
        const ctx = this.dataStore.ctx

        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        
        ctx.fillStyle = ' #ecdccf'
        ctx.font = "24px Arial"
        ctx.fillText('得分', canvas.width / 2, canvas.height * .08 + canvas.width * .3 * .3)
        
        ctx.fillStyle = 'white'
        ctx.font = "48px Arial"
        ctx.fillText(this.dataStore.score, canvas.width / 2, canvas.height * .08 + canvas.width * .3 * .7)
    }
}