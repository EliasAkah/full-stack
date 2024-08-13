const pTags =  document.querySelectorAll('p');
const btn =  document.querySelector('button');

btn.addEventListener('click', function() {
    for (let i = 0; i < pTags.length; i++) {
        switch (i) {
            case 0:
            pTags[i].style.color = 'blue';
            break;
            case 1:
            pTags[i].style.color = 'green';
            break;
            case 2:
            pTags[i].style.color = 'orange';
            break;
            default: 
            pTags[i].style.color = 'black';
            break;
        }
    }
});