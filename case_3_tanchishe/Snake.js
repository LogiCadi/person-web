//自调用函数---小蛇对象
(function () {
    function Snake() {
        this.weight = 40;
        this.height = 40;
        this.attr = [
            {x: 2, y: 10, color: "#ff0c1b"},
            {x: 1, y: 10, color: "#fffd0d"},
            {x: 0, y: 10, color: "#fffd0d"}
        ];
        this.direction = "right";
        //存储小蛇身体所有元素
        this.element = [];
        this.score = 0;
    }

    /**
     * 创建县设对象
     * @param map 地图对象
     * @param food 食物对象
     */
    Snake.prototype.init = function (map, food) {
        //把attr属性修改至下一次的位置
        this.editAttr(map, food);
        //判断下一次的位置时蛇头是否出界
        var head = this.attr[0];
        if (head.x < 0 || head.x >= map.offsetWidth / this.weight) {
            clearInterval(window.timeId);
            alert("游戏结束,您的得分：" + this.score);
            window.location.reload();
            return;
        }
        if (head.y < 0 || head.y >= map.offsetHeight / this.height) {
            clearInterval(window.timeId);
            alert("游戏结束,您的得分：" + this.score);
            window.location.reload();
            return;
        }
        //删除之前构成小蛇身体的所有div对象
        if (this.element.length > 0) {
            for (var i = 0; i < this.element.length; i++) {
                this.element[i].parentElement.removeChild(this.element[i]);
            }
            this.element = [];
        }

        for (var i = 0; i < this.attr.length; i++) {
            var div = document.createElement("div");

            div.style.width = this.weight + "px";
            div.style.height = this.height + "px";
            div.style.position = "absolute";
            div.style.backgroundColor = this.attr[i].color;
            div.style.left = this.attr[i].x * this.weight + "px";
            div.style.top = this.attr[i].y * this.height + "px";

            this.element.push(div);
            map.appendChild(div);
        }
    };

    //小蛇移动后，属性值的变化
    Snake.prototype.editAttr = function (map, food) {
        //记录蛇尾对象的属性值
        var lastX = this.attr[this.attr.length - 1].x;
        var lastY = this.attr[this.attr.length - 1].y;
        var lastColor = this.attr[this.attr.length - 1].color;

        for (var i = this.attr.length - 1; i >= 0; i--) {
            if (i == 0) {
                //i=0表示蛇头
                switch (this.direction) {
                    case "top":
                        this.attr[i].y = this.attr[i].y - 1;
                        break;
                    case "right":
                        this.attr[i].x = this.attr[i].x + 1;
                        break;
                    case "bottom":
                        this.attr[i].y = this.attr[i].y + 1;
                        break;
                    case "left":
                        this.attr[i].x = this.attr[i].x - 1;
                        break;
                    default:
                        break;
                }
            } else {
                this.attr[i].x = this.attr[i - 1].x;
                this.attr[i].y = this.attr[i - 1].y;
            }
        }

        //判断蛇头是否碰到了身体
        for (var i = 0; i < this.attr.length; i++) {
            if (i != 0) {
                if (this.attr[0].x == this.attr[i].x && this.attr[0].y == this.attr[i].y) {
                    clearInterval(window.timeId);
                    alert("游戏结束,您的得分：" + this.score);
                    window.location.reload();
                }
            }
        }

        //判断是否吃了食物
        if (this.attr[0].x == food.x && this.attr[0].y == food.y) {
            //克隆并追加一个新的蛇尾
            this.attr.push({x: lastX, y: lastY, color: lastColor});
            //增加分数
            this.score += Math.ceil(this.score / 10) + 1;
            document.getElementById("score").innerHTML = "得分：" + this.score;
            //刷新食物
            food.init(map);
        }
    };

    window.Snake = Snake;
}());