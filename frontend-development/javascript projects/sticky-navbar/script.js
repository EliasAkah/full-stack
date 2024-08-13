const navBar = document.querySelector('.navbar');

const bottomContainer = document.querySelector('.bottom-container');

const bottomContainerTop = bottomContainer.offsetTop;

window.addEventListener('scroll', () => {
    if (window.scrollY > bottomContainerTop - navBar.offsetHeight - 50) {
        navBar.classList.add('active');
    }
    else {
        navBar.classList.add('remove');
    }
});