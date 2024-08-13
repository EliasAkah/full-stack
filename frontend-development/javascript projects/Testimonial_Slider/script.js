//assigning the html tags to a variable
const imgEl = document.querySelector("img");
const pEl = document.querySelector(".text");
const h4El = document.querySelector(".username");


//creating an array containing several objects
const testimonials = [
    {
        alt:"james",
        name: "Quillbot Dav",
        photoURL: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
        text: "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful."
    },

    {
        alt:"elias",
        name: "David Smith",
        photoURL: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
        text: "Love is the warm hug that melts away the coldest of days, a gentle reminder that in the dance of life, we are never truly alone."
    },

    {
        alt:"david",
        name: "James Andrew",
        photoURL: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
        text: "Remember, a day without laughter is a day wasted, so let's make sure to find a reason to smile today!"
    }

];

//defining the idx variable
let idx = 0;

updateTestimonials();

//writing the updateTestimonials function
function updateTestimonials(){
    //descstructing the array objects
    const {alt, name, photoURL, text} = testimonials[idx];
    imgEl.src = photoURL;
    imgEl.alt = alt;
    pEl.innerText = text;
    h4El.innerText = name;
    idx++;
    if(idx === testimonials.length){
        idx = 0;
    }
    setTimeout(( )=>{
        updateTestimonials();
    }, 2000)
}