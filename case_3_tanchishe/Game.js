//自调用函数---游戏对象
(function () {
    function Game(map) {
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
    }

    Game.prototype.gameStart = function () {
        //启动键盘输入监视
        this.keyListener();
        //刷新食物
        this.food.init(this.map);
        //创建小蛇并让小蛇动起来
        window.timeId = setInterval(function () {
            this.snake.init(this.map, this.food);
        }.bind(this), 150);
    };
    Game.prototype.keyListener = function () {
        document.onkeydown = function (e) {
            switch (e.code) {
                case "ArrowUp":
                    this.direction = "top";
                    break;
                case "ArrowDown":
                    this.direction = "bottom";
                    break;
                case "ArrowLeft":
                    this.direction = "left";
                    break;
                case "ArrowRight":
                    this.direction = "right";
                    break;
                default:
                    break;
            }
        }.bind(this.snake);
        //给虚拟按键注册点击事件
        var snake = this.snake;
        document.getElementById("keyup").onmousedown = click;
        document.getElementById("keyleft").onmousedown = click;
        document.getElementById("keydown").onmousedown = click;
        document.getElementById("keyright").onmousedown = click;

        function click() {
            snake.direction = this.className;
        }
    };

    window.Game = Game;
}());