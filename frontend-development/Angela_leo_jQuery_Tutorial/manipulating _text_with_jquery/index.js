/*
$("h1").text("Good morning love!");
//$("h1").text("<b>Good morning love!</b>"); // produces an output text that contains both  the text and the bold tag.
$("h1").html("<em>Good morning love!</em>"); // gives an output text that contains only the text that is emboldened
*/

/* manipulation of attributes using jquery */

//$("h1").attr("href"); // use to check the content of the attribute.
//$("h1".attr("href", "http://www.yahoo.com")); // use to set the attribute, i.e changing  the value of the attribute (e.g href). 

/* adding addEventListener to your webpage using jquery */

$("h1").click(function () {
    $("h1").css("color", "orange");
});

/*
var buttonEffect = document.querySelectorAll("button").length;

for (var i = 0; i < buttonEffect; i++){
    document.querySelectorAll("button")[i].addEventListener("click", function () {
    setTimeout(function () {
        document.querySelector("h1").style.color = "purple";
    }, 10);
} );
}
*/

// $("button").click(function (event) {
//     $("h1").css("color", "yellow");
//     console.log(event);
// });


// $(document).keydown(function (event) {
//     $("h1").css("color", "yellow");
//     console.log(event.key);
// });

// $(input).keydown(function (event) {
//     console.log(event.key);
// });

// $(document).keydown(function (event) {
//     $("h1").text("event.key");
// });

$("h1").on("mouseover", function(){
    setTimeout(function () {
        $("h1").css("color", "purple");
    }, 100);
});


/* adding and removing elements using jquery */

$("h1").before("<button>New</button>");
$("h1").after("<button>New</button>");
$("h1").append("<button>New</button>");
$("h1").prepend("<button class = 'gift'>New</button>")
$(".gift").css("background-color", "green");

/* animation using jQuery */

// $("button").click(function() {
//     $("h1").toggle();
// });

// $("button").click(function() {
//     $("h1").hide();
// });

// $("button").click(function() {
//     $("h1").show();
// });

// $("button").click(function() {
//     $("h1").slide();
// });

// $("button").click(function() {
//     $("h1").slideToggle();
// });

// $("button").click(function() {
//     $("h1").fade();
// });

// $("button").click(function() {
//     $("h1").fadeToggle();
// });

$("button").click(function() {
    $("h1").animate({opacity: 0.5}).animate({opacity: 1});
});

$("button").click(function() {
    $("h1").animate({margin: "20%"}).animate({margin: "0%"});
});

$("button").click(function() {
    $("h1").animate({fontSize: "5rem"}).animate({fontSize: "3rem"});
});

// $("button").click(function() {
//     $("h1").animate({margin: "20%"})
// });