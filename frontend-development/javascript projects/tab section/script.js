const buttonEl = document.querySelectorAll('.button');
const tabsEl = document.querySelector('.tabs');
const contentEl = document.querySelectorAll('.content');



tabsEl.addEventListener('click', (event) =>{
    const id = event.target.dataset.id;

    if(id){
        //reove live class from all buttons
        buttonEl.forEach(btn => {
            btn.classList.remove("live");
        })

        //add "live" class to clicked buttons
        event.target.classList.add("live");

        //reove live class from all content elements
        contentEl.forEach(content => {
            content.classList.remove("live");
        })

        // Add "live" class to corresponding content element
        // const element = document.querySelector(`#${id}`);
        // element.classList.add("live");
        const element = document.getElementById(id)
        element.classList.add("live");
    }
})





