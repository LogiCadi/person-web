var Animal = function (name, age) {
    this.name = name
    this.age = age
}

Animal.prototype.say = function () {
    console.log(this.name + ' ' + this.age)
}

var cat = new Animal('小猫', 3)

cat.say()

// 寄生组合继承
Animal.prototype.say.call(cat)

var params = {
    name: '小猫2',
    age: 4
}
Animal.prototype.say.call(params)