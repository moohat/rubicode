let spaceship = {
    'Fuel Type' : 'Turbo Fuel',
    homePlanet : 'Earth',
    color: 'silver',
    'Secret Mission' : 'Discover life outside of Earth.'
};

//Write your code below
//reassign color property value silver to glorious gold
spaceship.color = 'glorious gold';
//add new property numEngines and value =9;
spaceship.numEngines = 9;

//delete property secret mission
//if the  word has space, it call with bracket
delete spaceship['Secret Mission'];
console.log(spaceship);
