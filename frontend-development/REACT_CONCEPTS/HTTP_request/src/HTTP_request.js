export async function fetchAvailablePlaces(){
    //fetching data from a given url
    const response = await fetch('http://localhost:3000/places')

    //checking if response is not ok(400, 500) and throwing an error to enscure that the application crashes so that the catch function can display and error message to the user
    if(!response.ok){
    //cause the application to break by throughing errror
    throw new Error('Failed to fetch places')
    }

    const realData = await response.json()

    return realData.places;
}

export async function UpdateUserPlaces(places){// places is an array of selected places sent to the request body
    //fetching data from a given url
    const response = await fetch("http://localhost:3000/user-places", {
        method: 'PUT',
        body: JSON.stringify({places}),
        headers:{
            'Content-Type': 'application/json',
        }
    })

    if(!response.ok){
        throw new Error('Failed to fetch User places')
    }

    const resData = await response.json();

    return resData.message;
}

export async function fetchExistingPlaces(){
    //fetching data from a given url
    const response = await fetch('http://localhost:3000/user-places')
    
    //checking if response is not ok(400, 500) and throwing an error to enscure that the application crashes so that the catch function can display and error message to the user
    if(!response.ok){
    //cause the application to break by throughing errror
    throw new Error('Failed to fetch users places from backend')
    }

    const realData = await response.json()

    return realData.places;
}