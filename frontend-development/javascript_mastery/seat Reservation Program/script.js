/*const rows = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r",  "s",  "t"];

let html = "";
let counter = 1;

rows.forEach(function(row){

    html += `<div class = "label">${row}</div>`;//responsible for the number of rows
    for(let i = 0; i < 3; i++){
        html += `<div id = "${row + counter}">${counter}</div>`;
        counter++;
    }//responsible for number of columns
    counter = counter + 12;//use to ensure that next row starts with a number after the previous row has gone through all its columns
});

document.getElementById('left').innerHTML = html;

html = "";
counter = 1;


rows.forEach(function(row){// row is used to access the each element of the array "rows"
    counter = counter + 12;//ensure that next row starts with a number after previous row has gone through all its columns
    for(let i = 0; i < 3; i++){
        html += `<div id = "${row + counter}">${counter}</div>`;
        counter++;
    }//responsible for number of columns
    html += `<div class = "label">${row}</div>`;//responsible for the number of rows
});

document.getElementById('right').innerHTML = html;

html = "";
counter = 1;


rows.forEach(function(row){// row is used to access the each element of the array "rows"
    counter = counter + 3;//ensure that next row starts with a number after previous row has gone through all its columns
    for(let i = 0; i < 9; i++){
        html += `<div id = "${row + counter}">${counter}</div>`;
        counter++;
    }//responsible for number of columns
    counter = counter + 3;
});

document.getElementById('middle').innerHTML = html;

function makeRows(sectionLength, rowLength, placement){
    const rows = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r",  "s",  "t"];

    let html = "";
    let counter = 1;

    rows.forEach(function(row){
        switch(placement){
            case "left": html += `<div class = "label">${row}</div>`; break;
            case "right": counter = counter + (rowLength - sectionLength); break;
            default: counter =  counter + ((rowLength - sectionLength)/2); break;
        }
    
        for(let i = 0; i < sectionLength; i++){
            html += `<div class = "a" id = "${row + counter}">${counter}</div>`;
            counter++;
        }
    
        switch(placement){
            case "left": counter = counter + (rowLength - sectionLength); break;
            case "right": html += `<div class = "label">${row}</div>`; break;
            default:counter =  counter + ((rowLength - sectionLength)/2); break;
        }

    });
    document.getElementById(placement).innerHTML = html;  
}

makeRows(3, 15, 'left');
makeRows(3, 15, 'right');
makeRows(9, 15, 'middle');*/

let reservedSeats = {
	record1: {
		seat: "b19",
		owner: {
			fname: "Joe",
			lname: "Smith"
		}
	},
	record2: {
		seat: "b20",
		owner: {
			fname: "Joe",
			lname: "Smith"
		}
	},
	record3: {
		seat: "b21",
		owner: {
			fname: "Joe",
			lname: "Smith"
		}
	},
	record4: {
		seat: "b22",
		owner: {
			fname: "Joe",
			lname: "Smith"
		}
	}
};

// using an arrow function



function makeRows(sectionLength, rowLength, placement){
    const rows = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r",  "s",  "t"];

    let html = "";
    let counter = 1;

    rows.forEach(function(row){
        switch(placement){
            case "left": html += `<div class = "label">${row}</div>`; break;
            case "right": counter = counter + (rowLength - sectionLength); break;
            default: counter =  counter + ((rowLength - sectionLength)/2); break;
        }
    
        for(let i = 0; i < sectionLength; i++){
            html += `<div class = "a" id = "${row + counter}">${counter}</div>`;
            counter++;
        }
    
        switch(placement){
            case "left": counter = counter + (rowLength - sectionLength); break;
            case "right": html += `<div class = "label">${row}</div>`; break;
            default:counter =  counter + ((rowLength - sectionLength)/2); break;
        }

    });
    document.getElementById(placement).innerHTML = html;  
}

makeRows(3, 15, 'left');
makeRows(3, 15, 'right');
makeRows(9, 15, 'middle');

(function(){
    "use strict";

    let selectedSeats = [];
    const seats = document.querySelectorAll('.a'); // access all the elements with the class ".a"

   for(const key in reservedSeats){
        if (reservedSeats.hasOwnProperty(key)){
            let obj = reservedSeats[key];
            console.log(obj.seat);

            document.getElementById(obj.seat).className = "r";
            document.getElementById(obj.seat).innerHTML = "R";
        }
    } 
    
    // looping through all the elements that contain the class ".a"
    seats.forEach(seat =>{
        seat.addEventListener('click', () =>{
            // console.log(seat.id);
            seatSelectionProcess(seat.id);
        });
    });

    function seatSelectionProcess(thisSeat){
        // add seat to the array
        let index = selectedSeats.indexOf(thisSeat);

        if(!document.getElementById(thisSeat).classList.contains('r')){
            if(index > -1){
                selectedSeats.splice(index, 1);
                document.getElementById(thisSeat).className = "a";
                
            }
            else{
                selectedSeats.push(thisSeat);
                document.getElementById(thisSeat).className = "s";
            }
            ManageConfirmForm();
            console.log(selectedSeats);
        }
    }

    let reserveBtn = document.getElementById('reserve');
    let cancleBtn = document.getElementById('cancle');
    cancleBtn.style.textDecoration = "none";

    reserveBtn.addEventListener('click', function(event){
        event.preventDefault();
        document.getElementById('resform').style.display = "block";
        
    });

    cancleBtn.addEventListener('click', function(event){
        event.preventDefault();
        document.getElementById('resform').style.display = "none";
        
    });

    function ManageConfirmForm(){
        if(selectedSeats.length > 0){
            document.getElementById('confirmres').style.display = "block";
            let seatString = selectedSeats.toString();

            if(selectedSeats.lenght === 1){
                document.getElementById('selectedseats').innerHTML = `you have selected seat [${seatString[0]}]`;
            }
            else{
                seatString = seatString.replace(/,/g, ", ");
                seatString = seatString.replace(/,(?=[^,]*$)/, " and ");
                document.getElementById('selectedseats').innerHTML = `you have selected seat [${seatString}]`;
            }
        }
        else{
            document.getElementById('confirmres').style.display = "none";
            document.getElementById('selectedseats').innerHTML = `you need to select some seats to reserve.<br><a  href = "#" 
            id = "error">Close</a> this dialog box and pick at least one seat.`;

            document.getElementById('error').onclick = () =>{
                document.getElementById('resform').style.display = "none";
            }
        }
    }

    ManageConfirmForm();

    document.getElementById('confirmres').addEventListener('submit', function(event){
        event.preventDefault();
        processReservation();
    });

    function processReservation(){
        const hardCodeRecords = Object.keys(reservedSeats).length;
        const fname = document.getElementById('fname').value;
        const lname = document.getElementById('lname').value;
        let counter = 1;
        let nextRecord = '';

        selectedSeats.forEach(function(thisSeat){
            document.getElementById(thisSeat).className = "r";
            document.getElementById(thisSeat).innerHTML = "R";

            nextRecord = `record${hardCodeRecords + counter}`;

            reservedSeats[nextRecord] = {
                seat: thisSeat,
                owner:{
                    fname: fname,
                    lname: lname
                }
            }
            counter++;
        });

        //clean up
        document.getElementById('resform').style.display = "none";
        selectedSeats = [];
        ManageConfirmForm();

        console.log(reservedSeats);
    }

}());
 
