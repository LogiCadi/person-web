//自调用函数---食物对象
(function () {
    function Food() {
        this.weight = 40;
        this.height = 40;
        this.color = "green";
        this.x;
        this.y;
    }

    //初始化食物
    Food.prototype.init = function (map) {
        //删除之前的食物
        remove();
        var div = document.createElement("div");
        div.style.width = this.weight + "px";
        div.style.height = this.height + "px";
        div.id = "food";
        div.style.backgroundColor = this.color;
        //设置坐标
        div.style.position = "absolute";
        this.x = Math.floor(Math.random() * (map.offsetWidth / this.weight));
        this.y = Math.floor(Math.random() * (map.offsetHeight / this.height));
        div.style.left = this.x * this.weight + "px";
        div.style.top = this.y * this.height + "px";

        map.appendChild(div);
    };

    function remove() {
        var foodEle = document.getElementById("food");
        if (foodEle) {
            foodEle.parentElement.removeChild(foodEle);
        }
    }

    window.Food = Food;
}());