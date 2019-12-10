class CarFactory{
    constructor(){
        this.numberOfCars = [Math.floor(Math.random() * 4)];
    }

    startBuild(){
        let resultCar = [];
        let startBuildRollsRoyce = new RollsRoyce(2,2);
        let startBuildLexus = new Lexus(4,6);


        for (let index = 0; index < this.numberOfCars; index++) {
        resultCar.push(startBuildRollsRoyce.buildRollsRoyce());            
        resultCar.push(startBuildLexus.buildLexus());            
        }

        console.log(this.numberOfCars);
        console.log(resultCar);       
    }
}


class Car{
    constructor(numberOfDoor, numberOfSeat) {
        this.tyre = new Tyre();
        this.productionYear = 2019;
        this.numberOfDoor = numberOfDoor;
        this.numberOfSeat = numberOfSeat;
    }

    warrantyCalculation(){
        let year = new Date();
        return(year.getFullYear() + (Math.floor(Math.random() * 4) + 3));
    }
}

class Tyre{
    constructor(){
        const tyreBrands = ['Bridgestone', 'GT Radial', 'Dunlop'];
        this.tyreBrand = tyreBrands[Math.floor(Math.random() * 4)];
    }
    getBrand(){
        console.log(`Tyre brand: ${this.tyreBrand}`);        
    }
}

class RollsRoyce extends Car{
    buildRollsRoyce(){
        let objectBuild = {
            carBrand : 'Rolls Royce',
            numberOfDoor: `${this.numberOfDoor}`,
            numberOfSeat: `${this.numberOfSeat}`,
            tyre: `${this.tyre.tyreBrand}`,
            warranty: `${this.warrantyCalculation() - this.productionYear >= 0? 'Active': 'Expired'}`
        }
        return objectBuild;
    }
}

class Lexus extends Car{
    buildLexus(){
        let objectBuild = {
            carBrand : 'Lexus',
            numberOfDoor: `${this.numberOfDoor}`,
            numberOfSeat: `${this.numberOfSeat}`,
            tyre: `${this.tyre.tyreBrand}`,
            warranty: `${this.warrantyCalculation() - this.productionYear >= 0? 'Active': 'Expired'}`
        }
        return objectBuild;
    }
}

let cars = new CarFactory();
cars.startBuild();