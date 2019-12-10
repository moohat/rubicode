class Vehicle{
    constructor(make, model, color){
        this.make = make;
        this.model = model;
        this.color = color;
    }
    getName(){
        return this.make + " "+this.model;
    }   
}

class Car extends Vehicle{
    getName(){
        return super.getName() +" -called base class function from child class.";
    }
}

let car = new Car("Honda", "Accord", "Purple");
console.log(car.getName());

