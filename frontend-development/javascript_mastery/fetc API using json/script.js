document.getElementById('loaddata').addEventListener('click', getData);

// asychronously getting data from the file
async function getData(){
    //add fetch promise code here....
    document.getElementById('remotedata').innerHTML = '<img src = "images/spinner.gif">';
    const fetchPromise = await fetch('https://cpe-web-assignments.ucdavis.edu/remotedata/data.php');
    const data = await fetchPromise.json();
    document.getElementById('remotedata').innerHTML = outputHTML(data);
    document.getElementById('remotedata').className = 'serverdata';  
}
function outputHTML(data){
    const html = `<div class = "servedata">
        <h2>${data.sleep_time}seconds</h2>
        <p>${data.time_requested}</p>
        <p>${data.time_processed}</p>
    </div>`;
        return html;
}


let pageColor = "white";
let fontSize = "large";

document.getElementById('bgcolor').onclick = function(){
    if(pageColor == 'white'){
        document.getElementById('page').style.backgroundColor =  '#f2f4b1';
        pageColor = "yellow";
    }
    else{
        document.getElementById('page').style.backgroundColor =  '#fffcfc';
        pageColor = "white";
    }
};

document.getElementById('font').onclick = function() {
    if (fontSize == 'large') {
        document.getElementsByTagName('h1')[0].style.fontSize = '2.5em';
        document.getElementsByTagName('h2')[0].style.fontSize = '2.0em';
        let newParagraphSize = document.getElementsByTagName('p');
        Array.from(newParagraphSize).forEach(function(para) {
            para.style.lineHeight = '2.0em';
        });
        fontSize = "small";
    } else {
        document.getElementsByTagName('h1')[0].style.fontSize = '2.0em';
        document.getElementsByTagName('h2')[0].style.fontSize = '1.5em';
        let newParagraphSize = document.getElementsByTagName('p');
        Array.from(newParagraphSize).forEach(function(para) {
            para.style.lineHeight = '1.5em';
        });
        fontSize = "large";
    }
};
