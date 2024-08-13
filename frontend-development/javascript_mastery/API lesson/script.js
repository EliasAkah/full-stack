let mainElement = document.querySelector('main');

async function getFilms(){
    //accessing data from a given database
    const filmsPromise  = await fetch('https://ghibliapi.herokuapp.com/films');
    const films =  await filmsPromise.json();
    console.log(films);
}

getFilms();