add = (a, b) => {
    return a + b;
}

subtract = (a, b) => {
    return a - b;
}

exports = {
    add,
    subtract,
}

///here since the exports keyword is assigned the object literal it means in the execution of the code
//the exports argument of iife will contain two key-values of (add and subtract), but since the exports keyword
// was not assigned a property it looses reference to the module.exports there return an empty value when it is imported 
// in another file.