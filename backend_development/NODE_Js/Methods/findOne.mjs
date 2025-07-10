import {MongoClient} from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.MONGO_URI;
const port  = process.env.PORT;
const client = new MongoClient(url);

async function run(){
    try{
        await client.connect();

         // Connect to the database and collection on which to run the operation
        const database = client.db("sample_mflix");
        const movies = database.collection("movies");
    
        //query is the condition that must be met for a document to fetched
        const query = {title: "The Room"}
    
        //additional information about the document to be fetched
        const options = {
            //Sort matched documents in descending order by rating
            sort: {"Imbd.rating": -1},
            // Include only the `title` and `imdb` fields in the returned document
            projection: {
                _id: 0,
                title: 1,
                imdb: 1
            },
        }
    
        //Execute query
        const movie = await movies.findOne(query, options);
        console.log(movie)

    }finally{
        await client.close();
    }

}
run().catch(console.error);

        /*
        //creating an iterable async cursor that point to each document that meets the query condition
        const cursor = await movies.findOne();
        //output a message when no docs is meets the criteria
        if((await collectionName.countDocuments(query)) === 0){
            console.log("No documents meets the query conditions");
        }
    
        //creating an async iterable loop to iterat over aync iterables like MongoDB cursors.
        for await(const doc of cursor){
            //process each doc as the retrieved from the cursor without waiting for the entire query to complete. it's efficient for large dataset
            //.dir equivalent of .log. it reads objects better than .log 
            console.dir(doc)
        }*/