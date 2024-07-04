 class DataStore {
// export class DataStore {
    constructor() {
        this.map = new Map()
        this.isAnimate = new Map()
        // 区块合并目标位置显示伪区块
        this.fakeList = new Map()
    }

    static getInstance() {
        if (!DataStore.instance) {
            DataStore.instance = new DataStore()
        }
        return DataStore.instance
    }

    put(key, value) {
        if (typeof value == 'function') {
            value = new value()
        }
        this.map.set(key, value)
        return this
    }

    get(key) {

        return this.map.get(key)
    }

    destroy() {
        for (let value of this.map.values()) {
            value = null
        }
        for (let value of this.isAnimate.values()) {
            value = null
        }
        for (let value of this.fakeList.values()) {
            value = null
        }
    }
}