class Animal {
    constructor(name, age) {
        this.name = name
        this.age = age
    }

    say() {
        console.log(this.name + ' ' + this.age)
    }
}

class Cat extends Animal {
    constructor(name, age) {
        super(name, age)
    }

    say(){
        super.say()
        console.log('子类的say')

    }
}

const cat = new Cat('小猫', 3)
cat.say()
