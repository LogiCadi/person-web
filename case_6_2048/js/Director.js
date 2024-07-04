// import { DataStore } from "./base/Datastore.js";
// import { Block } from "./sprite/Block.js";

class Director {
    // export class Director {
    constructor() {
        this.dataStore = DataStore.getInstance()
    }

    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director()
        }
        return Director.instance
    }

    /**新增数字块 */
    newBlock() {
        const blockList = this.dataStore.get('block')

        let newSite
        do {
            // 随机1-16之间的数
            newSite = Math.floor(Math.random() * 16 + 1)
            // 位置已被占用 重新生成随机数
        } while (blockList.get(newSite))
        // console.log('newBlock:' + newSite)

        // 添加到site
        blockList.set(newSite, new Block(newSite))
    }

    /**平移数字快 */
    moveBlock(derect) {
        if (this.dataStore.isTouch && this.dataStore.isAnimate.size == 0) {
            // console.log(derect)
            this.dataStore.isTouch = false

            let arr
            switch (derect) {
                case 1:
                    // →
                    arr = [4, 3, 2, 1, 8, 7, 6, 5, 12, 11, 10, 9, 16, 15, 14, 13]
                    break;
                case 2:
                    // ↑
                    arr = [4, 8, 12, 16, 3, 7, 11, 15, 2, 6, 10, 14, 1, 5, 9, 13]
                    break;
                case 3:
                    // ←
                    arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
                    break;
                case 4:
                    // ↓
                    arr = [13, 9, 5, 1, 14, 10, 6, 2, 15, 11, 7, 3, 16, 12, 8, 4]
                    break;
                default:
                    break;
            }
            this.moveCheck(arr)

            if (this.dataStore.isMove) {
                this.newBlock()
                this.dataStore.isMove = false
            } else {
                if (this.dataStore.get('block').size >= 16) {
                    // 游戏结束
                    console.log('game over')
                    this.isGameOver = true
                }
            }
            this.run()

        }
    }

    /**
     * 逐个判断是否需要位移和移动目标位置
     */
    moveCheck(arr) {
        const blockList = this.dataStore.get('block')

        for (let i = 0; i < 16; i++) {
            if (i % 4 != 0 && blockList.get(arr[i])) {
                // console.log(arr[i])
                let head
                for (let j = 3; j > 0; j--) {
                    if ((i - j) % 4 == 0) {
                        head = i - j
                        break
                    }
                }
                // console.log(`head:${arr[head]}`)
                for (let j = head; j < i; j++) {

                    if (!blockList.get(arr[j])) {
                        // 移动区块到空白区域
                        blockList.get(arr[i]).site = arr[j]

                        blockList.set(arr[j], blockList.get(arr[i]))
                        blockList.delete(arr[i])

                        this.dataStore.isMove = true
                        break
                    }

                    if (blockList.get(arr[j]) && blockList.get(arr[j]).num == blockList.get(arr[i]).num) {
                        // 移动合并数字相同区块

                        // 路径中间必须全部为空白块才能合并
                        let isBlank = true;
                        for (let k = j + 1; k < i; k++) {
                            if (blockList.get(arr[k])) {
                                isBlank = false
                                break
                            }
                        }

                        if (isBlank) {
                            // 创造一个fake区块占位
                            this.dataStore.fakeList.set(arr[j], new Block(arr[j], false, blockList.get(arr[i]).num))

                            blockList.get(arr[i]).num *= 2
                            // 增加分数
                            this.dataStore.score += blockList.get(arr[i]).num

                            blockList.get(arr[i]).site = arr[j]

                            blockList.set(arr[j], blockList.get(arr[i]))
                            blockList.delete(arr[i])

                            this.dataStore.isMove = true

                            break
                        }

                    }

                }

            }
        }
    }


    run() {
        if (!this.isGameOver) {
            this.dataStore.get('background').draw()
            this.dataStore.get('score').draw()

            // 对整个blockList进行渲染
            const blockList = this.dataStore.get('block')

            for (const value of this.dataStore.fakeList.values()) {
                value && value.draw()
            }
            for (const value of blockList.values()) {
                value && value.draw()
            }

            if (this.dataStore.isAnimate.size > 0) {
                this.dataStore.timer = requestAnimationFrame(() => this.run())
            } else {
                cancelAnimationFrame(this.dataStore.timer)
                // 动画完毕 清空伪区块列表
                this.dataStore.fakeList.clear()
            }

        } else {
            this.dataStore.get('startButton').draw()
            this.dataStore.destroy()
        }
    }
}
