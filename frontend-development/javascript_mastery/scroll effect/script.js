const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach(function(eachlink){
    eachlink.addEventListener('click', smoothScroll);
});

function smoothScroll(event){
    event.preventDefault();

    const targetID = event.target.getAttribute('href');
    const targetSection = document.querySelector(targetID);
    var originalTop = Math.floor(targetSection.getBoundingClientRect().top)-200;
    window.scrollBy({top: originalTop, left: 0, behavior: 'smooth'});// that not all browsers support smooth example is safari browser.
    // console.log(originalTop);
}

window.addEventListener('load', function(){

    const posts =  document.querySelectorAll('section');
    let postTops = [];
    let pagetop;
    let counter = 1;
    let prevCounter  = 1;
    let doneResizing;

    resetPagePosition();
    // console.log(postTops);

    this.window.addEventListener('scroll', function(){
        pagetop = Math.floor(window.scrollY)  + 250;
        // console.log(pagetop);

        if (pagetop > postTops[counter]){
            counter++;
            console.log(`scrolling down to ${counter}`);
        }else if (counter > 1 && pagetop < postTops[counter-1]){
            counter--;
            console.log(`scrolling up to ${counter}`)
        }
        if(counter != prevCounter){
            navLinks.forEach(function(eachlink){
                eachlink.removeAttribute('class');
            });

            const thisLink = document.querySelector(`nav ul li:nth-child(${counter}) a`);
            thisLink.className = 'selected';
            prevCounter = counter;
        }
    });
    window.addEventListener('resize', function(){
        clearTimeout(doneResizing);
        doneResizing = setTimeout(function(){
            console.log('done resizing');
            resetPagePosition();
        }, 500);
    });
    function resetPagePosition(){
        postTops = [];

        posts.forEach(function(post){
            postTops.push( Math.floor(post.getBoundingClientRect().top + window.scrollY) );
        });

        const pagePosition = window.scrollY + 250;
        counter = 0;

        postTops.forEach(function(post){
            if(pagePosition > post){
                counter++;
            }
        });

        navLinks.forEach(function(eachlink){
            eachlink.removeAttribute('class');
        });

        const thisLink = document.querySelector(`nav ul li:nth-child(${counter}) a`);
        thisLink.className = 'selected';

    }
});



