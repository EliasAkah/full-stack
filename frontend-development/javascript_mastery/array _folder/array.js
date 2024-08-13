//var vehicle = ["ford", ["fiesta", "taurus", "explorer"], "honda", ["pilot", "civic", "acccord"], "toyota", ["corolla", "camry", "prius"]];
var vehicles = ["motor", "innosson", "peugeot", "audi"];
for(var eachVehicle of vehicles) { // use to print out all the elements of a given array.
    console.log(eachVehicle); 
}


// var hello = true;
// var hi =  false;
// var green; // when variable are undefinded, null and zero it is identified as false;
// if(!hi) {
//     console.log(hello);
// }
// else {
//     console.log(hi);
// }

// alert("hello world!");

/* structued programming makes of three structures namely:
sequence: first do this, then do that, and then finally do this over there(order of carrying out tasks)
selection: if some condition is true, do this, otherwise do that. (selection of tasks to perform according to given conditions)
loop: while this condition is true, do this(repeatition of tasks if condition remains true).
*/

// var myString = "i am really hungry for some";
// console.log(myString);

// var myUpperString = myString.toUpperCase();
// console.log(myUpperString);

var myString1 = "i am really hungry for some";
var spliced = myString1.slice(5,11);
console.log(spliced);
var myUpperString = spliced.toUpperCase();
console.log(myUpperString);
var replacedString = myString1.replace("really", myUpperString);
console.log(replacedString);
var foods = ["abacha", "ogbono", "okro_soup", "bitter_leaf_sounp"];

for (var i = 0; i < foods.length; i++) {
    if ((i % 2) === 0){
        var array = foods[i].toUpperCase();
        console.log(myString1 + " " + array);
    }
    else{
        console.log(myString1 + " " + foods[i]);
    }
    
}


const table = await db.createTable("food", {
    id: Number,
    
})



// var reallyLocation = myString1.search('really');
// var specialWord = myString1.substr(reallyLocation, 6); // six rep length of the substring 'really
// specialWord = specialWord.toUpperCase();
// var newString = myString1.replace('really', specialWord);// replaces the only the first substring in an array.
// var newString1 = myString1.replace(/really/g, specialWord); // for global replacement of all really words in the given array
// console.log(newString);
// console.log(newString1);
