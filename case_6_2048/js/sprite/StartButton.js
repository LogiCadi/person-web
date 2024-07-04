// import { DataStore } from "../base/Datastore.js";

 class StartButton {
// export class StartButton {
    constructor() {
        this.dataStore = DataStore.getInstance()

        this.image = new Image()
        this.image.src = 'res/start.png'
    }

    draw() {
        const ctx = this.dataStore.ctx
        const canvas = this.dataStore.canvas

        ctx.drawImage(this.image,
            (canvas.width - this.image.width / 2) / 2, (canvas.height - this.image.height / 2) / 2,
            this.image.width / 2, this.image.height / 2)
    }
}