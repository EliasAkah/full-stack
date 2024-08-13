const btnEl = document.getElementById("btn");
const birthdayEl = document.getElementById("birthday");
const pEl = document.getElementById("result");

function calculateAge() {
    const birthdayValue = birthdayEl.value;
    if (birthdayValue === ""){
        alert("please enter your birthday");
    }else{
        let individualAge = getAge(birthdayValue);
        pEl.innerHTML = `Your age is ${individualAge} ${individualAge > 1 ? "years" : "year"} years old`
    }


}

function getAge(birthdayValue){
    const currentDate =  new Date();
    const birthdayDate = new Date(birthdayValue);

    //calulating age using by subtracting the birthyear from current year
    let age = currentDate.getFullYear() - birthdayDate.getFullYear();
    console.log(age);

    let month = currentDate.getMonth() - birthdayDate.getMonth();

    if(month < 0 || (month === 0 && currentDate.getDate() < birthdayDate.getDate())){
        age--;
        if(age < 0){
        age = 0;
        }
    }
    return age;
}

btnEl.addEventListener("click",calculateAge);