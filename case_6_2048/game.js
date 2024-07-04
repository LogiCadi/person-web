// console.log('成功加载game.js')

// import { Main } from './Main.js'

const ele = document.getElementById('game-canvas')
// canvas画布始终保持16：9比例
if (window.innerHeight / window.innerWidth > 16 / 9) {
    ele.style.width = window.innerWidth + 'px'
    ele.style.height = ele.style.height * (window.innerWidth / ele.style.width) + 'px'
} else {
    ele.style.height = window.innerHeight + 'px'
    ele.style.width = ele.style.width * (window.innerHeight / ele.style.height) + 'px'
}

new Main()

