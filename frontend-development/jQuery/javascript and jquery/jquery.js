// if (window.jQuery){
//         alert("jQuery is available or loaded");
// }
// else {
//     alert("jQuery is not available or loaded")
// }

// SELECTION OF TAGS USING THE JQURY

jQuery("p").even().css('color', 'red');
$('p').odd().css('color', 'pink');
$('li:has(ul)').css('border', '3px solid yellow');
$('li:contains(mysql)').css('color', 'blue');

// BEING ABLE TO KNOW THE BUTTON U CLICK ON USING JQUERY

// $('a').click(function(){
//     console.log ($(this).html());
// });

$('a').click(function(event){
    event.preventDefault();
    console.log(this.innerHTML);
});

