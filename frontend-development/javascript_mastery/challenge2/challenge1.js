(function () {
    "use strict";
    const pTags =  document.querySelector("p");
    const btn = document.querySelector("button");

    btn.addEventListener("click", function() {
        pTags.style.color = "green";
        btn.style.backgroundColor = "blue";
        btn.style.color = "white";
    });
})();