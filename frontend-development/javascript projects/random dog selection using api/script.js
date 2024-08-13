//getting a promise asynchronously using the fetch api
window.onload = () => {
    const dog = document.getElementById('dogs');
    document.getElementById('dogbtn').onclick = getDog;

    function getDog(){
        fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => response.json())
        .then(json =>{
            dog.innerHTML = `<img src = '${json.message}' height = 300 width = 300/>`;
        })
        .catch(error => {
            console.error("error fetching dod image", error);
        })

    }
}


