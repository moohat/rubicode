class CarFactory {
    constructor() {
        this.numberOfCars = [Math.floor(Math.random() * 4)];
    }
    startBuild() {
        let resultCar = [];
        let startBuildNissan = new Nissan (2, 4);
        let startBuildHonda = new Honda (4, 4);
        let startBuildSuzuki = new Suzuki (4, 6);
        let startBuildMitsubishi = new Mitsubishi (2, 2);
        for (let index = 0; index < this.numberOfCars; index++) {
            resultCar.push(startBuildNissan.buildNissan());
            resultCar.push(startBuildHonda.buildHonda());
            resultCar.push(startBuildSuzuki.buildSuzuki());
            resultCar.push(startBuildMitsubishi.buildMitsubishi());
        }
        console.log(this.numberOfCars);
        console.log(resultCar);
    }
}
class Car {
    constructor(numberOfDoor, numberOfSeat) {
        this.tyre = new Tyre();
        this.productionYear = 2019;
        this.numberOfDoor = numberOfDoor;
        this.numberOfSeat = numberOfSeat;
    }
    warrantyCalculation() {
        let year = new Date();
        return (year.getFullYear() + (Math.floor(Math.random() * 4) + 3));
    }
}
class Tyre {
    constructor(){
        const tyreBrands = ['Bridgestone', 'GT Radial', 'Dunlop', 'Yokohama'];
        this.tyreBrand = tyreBrands[Math.floor(Math.random() * 4)];
    }
    getBrand() {
        console.log(`Tyre brand: ${this.tyreBrand}`);
    }
}
class Nissan extends Car {
    buildNissan() {
        let objectBuild = {
            carBrand: 'Nissan',
            numberOfDoor: `${this.numberOfDoor}`,
            numberOfSeat: `${this.numberOfSeat}`,
            tyre: `${this.tyre.tyreBrand}`,
            warranty: `${this.warrantyCalculation() - this.productionYear >= 0 ? 'Active' : 'Expired'}`
        }
        return objectBuild;
    }
}
class Honda extends Car {
    buildHonda() {
        let objectBuild = {
            carBrand: 'Honda',
            numberOfDoor: `${this.numberOfDoor}`,
            numberOfSeat: `${this.numberOfSeat}`,
            tyre: `${this.tyre.tyreBrand}`,
            warranty: `${this.warrantyCalculation() - this.yearsBuild >= 0 ? 'Active' : 'Expired'}`
        }
        return objectBuild;
    }
}
class Suzuki extends Car {
    buildSuzuki() {
        let objectBuild = {
            carBrand: 'Suzuki',
            numberOfDoor: `${this.numberOfDoor}`,
            numberOfSeat: `${this.numberOfSeat}`,
            tyre: `${this.tyre.tyreBrand}`,
            warranty: `${this.warrantyCalculation() - this.yearsBuild >= 0 ? 'Active' : 'Expired'}`
        }
        return objectBuild;
    }
}
class Mitsubishi extends Car {
    buildMitsubishi() {
        let objectBuild = {
            carBrand: 'Mitsubishi',
            numberOfDoor: `${this.numberOfDoor}`,
            numberOfSeat: `${this.numberOfSeat}`,
            tyre: `${this.tyre.tyreBrand}`,
            warranty: `${this.warrantyCalculation() - this.yearsBuild >= 0 ? 'Active' : 'Expired'}`
        }
        return objectBuild;
    }
}
let cars = new CarFactory();
cars.startBuild();