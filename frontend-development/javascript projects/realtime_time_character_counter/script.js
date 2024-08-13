const span1 = document.querySelector('p .total-container');
const span2 = document.querySelector('p .remaining-container');
const textArea = document.querySelector('#textarea');

span1.style.color = 'rgb(148, 101, 243)';
span2.style.color = 'rgb(250, 90, 32)';

textArea.addEventListener('keyup', () => {
   updateCounter();
})

updateCounter();

function updateCounter() {
    const totalLength = textArea.value.length;
    span1.innerText = totalLength;

    const maxLength = textArea.getAttribute('maxlength');
    span2.innerText = maxLength-totalLength;
}