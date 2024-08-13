const btnEl = document.getElementById("btn");
const bmiResultEl = document.getElementById("bmi-result");
const weightConditiontEl = document.getElementById("weight-condition");

function computeWeight(){
    //retreive the value of html element with the id height and weight respectively
    let heightEl = document.getElementById('height').value;
    let weightEl = document.getElementById('weight').value;

    //converting the value of height value from cm to m
    heightEl = heightEl / 100;

    //calculating the body mass weight index(BMI)
    let BMI = weightEl / Math.pow(heightEl, 2);
    
    bmiResultEl.value = BMI;

    if(BMI <= 18.9){
        weightConditiontEl.innerText = 'Under Weight';
    }else if(BMI >= 18.9 && BMI <=24.9){
        weightConditiontEl.innerText = 'Normal Weight';
    }else if(BMI >= 24.9 && BMI <= 29.9){
        weightConditiontEl.innerText = 'Over Weight';
    }else if(BMI >= 29.9){
        weightConditiontEl.innerText = 'Obesity';
    }  
}


btnEl.addEventListener("click", computeWeight);