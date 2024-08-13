var p = document.getElementsByTagName("h1");
for (var i = 0; i < 3; i++) {
    p[i].style.color = "green";
    //alert("this is header " + [i]);
}

document.querySelector("input").setAttribute("checked", "checked");

// oroperties like: ".className = 'value'"  method like: .removeAttribute("attribteName")

document.getElementById("special").innerHTML = "<p>this is my world</p>";
document.querySelector("#special1").className = "james";
document.querySelector(".james").classList.add("david");

// var myTag = document.createElement("p");
// var mySentence = document.createTextNode("this is my beloved son")
// myTag.appendChild(mySentence);
var myDiv =  document.querySelectorAll('div')[1];
// myDiv.appendChild(myTag);
myDiv.removeChild(myDiv.children[2]);

// 
