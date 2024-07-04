// import { DataStore } from '../base/Datastore.js'

 class Block {
// export class Block {
    constructor(site, isNew = true, num = 2) {
        this.dataStore = DataStore.getInstance()

        // 新创建的区块 从小变大动画
        this.isNew = isNew
        this.scale = 20

        // 位置code
        this.site = site
        // 当前所在坐标
        this.oldSite = { x: site % 4 == 0 ? 4 : site % 4, y: Math.ceil(site / 4) }

        this.num = num
        this.oldNum = num

    }

    /**核心绘制 */
    draw() {
        const canvas = this.dataStore.canvas
        const ctx = this.dataStore.ctx

        // 目标坐标
        this.siteX = this.site % 4 == 0 ? 4 : this.site % 4
        this.siteY = Math.ceil(this.site / 4)

        if (this.siteX != this.oldSite.x) {
            this.dataStore.isAnimate.set(this, true)
            this.oldSite.x += (this.siteX - this.oldSite.x) / 8
            if (Math.abs(this.oldSite.x - this.siteX) < 0.05) {
                this.oldSite.x = this.siteX
            }

        } else if (this.siteY != this.oldSite.y) {
            this.dataStore.isAnimate.set(this, true)
            this.oldSite.y += (this.siteY - this.oldSite.y) / 8
            if (Math.abs(this.oldSite.y - this.siteY) < 0.05) {
                this.oldSite.y = this.siteY
            }
        } else {
            // 区块已达到目标位置
            this.dataStore.isAnimate.delete(this)
            this.oldNum = this.num

        }

        switch (this.oldNum) {
            case 2:
                ctx.fillStyle = '#eee4da'
                break;
            case 4:
                ctx.fillStyle = '#ead9bd'
                break;
            case 8:
                ctx.fillStyle = '#f2b179'
                break;
            case 16:
                ctx.fillStyle = '#f59563'
                break;
            case 32:
                ctx.fillStyle = '#f57c5f'
                break;
            case 64:
                ctx.fillStyle = '#f65d3b'
                break;
            case 128:
                ctx.fillStyle = '#edce71'
                break;
            case 256:
                ctx.fillStyle = '#edcc61'
                break;
            case 512:
                ctx.fillStyle = '#ecc850'
                break;
            case 1024:
                ctx.fillStyle = '#edc53f'
                break;
            case 2048:
                ctx.fillStyle = '#eec22e'
                break;
            case 4096:
                ctx.fillStyle = '#adb778'
                break;
            case 8192:
                ctx.fillStyle = '#aab767'
                break;
            default:
                break;
        }

        // 绘制区块
        if (this.isNew) {
            this.dataStore.isAnimate.set(this, true)
            if (--this.scale <= 0) {
                this.scale = 0
                this.dataStore.isAnimate.delete(this)
                this.isNew = false
            }
            ctx.fillRect(
                (canvas.width * .05 + 3 + canvas.width * .9 / 4 * (this.oldSite.x - 1)) + this.scale,
                (canvas.height - canvas.width * 1.2 + 3 + canvas.width * .9 / 4 * (this.oldSite.y - 1)) + this.scale,
                (canvas.width * .9 / 4 - 6) - this.scale * 2,
                (canvas.width * .9 / 4 - 6) - this.scale * 2)
        } else {
            ctx.fillRect(
                (canvas.width * .05 + 3 + canvas.width * .9 / 4 * (this.oldSite.x - 1)),
                (canvas.height - canvas.width * 1.2 + 3 + canvas.width * .9 / 4 * (this.oldSite.y - 1)),
                (canvas.width * .9 / 4 - 6),
                (canvas.width * .9 / 4 - 6))
        }

        // 绘制数字
        ctx.fillStyle = 'white'
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "32px Arial";
        ctx.fillText(this.oldNum,
            canvas.width * .05 + 3 + canvas.width * .9 / 4 * (this.oldSite.x - 1) + (canvas.width * .9 / 4 - 6) / 2,
            canvas.height - canvas.width * 1.2 + 3 + canvas.width * .9 / 4 * (this.oldSite.y - 1) + (canvas.width * .9 / 4 - 6) / 2)
    }
}
