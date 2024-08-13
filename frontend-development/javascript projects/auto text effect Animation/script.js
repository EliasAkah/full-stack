const containerEl =  document.querySelector(".container");

const careers = ["Youtuber", "Web Developer", "Freelancer", "Instructor", "UI-Ux developer"];

let careerIndex  = 0;
let CharacterIndex = 0;

updatecareeer();

function updatecareeer(){
    CharacterIndex++;

    containerEl.innerHTML = `<h1>I am ${checkChar(careers[careerIndex].slice(0, 1))} ${careers[careerIndex].slice(0, CharacterIndex)}</h1>`;
    
    //moving to the next career in the careers array
    if(CharacterIndex === careers[careerIndex].length){
        careerIndex++;
        CharacterIndex = 0;
    }

    //ensuring the continuity and contionus looping of the function
    if(careerIndex === careers.length){
        careerIndex = 0;
    }
    setTimeout(updatecareeer, 400);
}



function checkChar(char){ 
    let ch;
    ch  = char.toLowerCase();  
    if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') 
    return "an"
    return "a"; 
} 
  