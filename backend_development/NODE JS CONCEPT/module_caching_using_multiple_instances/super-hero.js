class SuperHero{
    constructor(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    setName(name){
        this.name = name;
    }
}

module.exports = SuperHero;

// to all mutilple instances of the class to be used in the file where this module is to exported. we should
// export the class and not the instance of the class