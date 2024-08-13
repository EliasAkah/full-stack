alert("hello world");
    var thisDiv = document.getElementById("thediv");
    var content = "<p>New Content</p>";

     
    var timer = setInterval(function() {thisDiv.innerHTML += content},1500);

   document.getElementById("stop").addEventListener("click", function(){clearInterval(timer);});

   
