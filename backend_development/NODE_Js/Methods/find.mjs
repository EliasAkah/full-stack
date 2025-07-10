//findOne(query,options) findMany(query,options);

import {MongoClient} from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.MONGO_URI;
const port  = process.env.PORT;
//link application to the Mongo atlas server of the database
const client = new MongoClient(url);

async function run(){
    try{
        //waiting for the application to connect to the database
        await client.connect();
        //fetching collections from a given database
        const database = client.db("sample_mflix");
        const movies = database.collection("movies");

        //query movies that have runtime less than 15 minutes
        const query = {runtime: {$lt: 15}};

        const options ={
            //set returned documents in ascending order by titile(A->Z)
            sort: {
                title: 1
            },

            //include only the 'title' and 'imdb' fields in each returned document
            projection: {
                _id: 0,
                title: 1,
                imdb: 1
            },
        }

        //Execute query
        const cursor = movies.find(query, options);

        //Print a message if no documents were found
        if((await movies.countDocuments(query)) === 0){
            console.log("No documents found!");
        }

        //Print returned documents
        for await(const doc of cursor){
            console.dir(doc)
        }

        }finally{
            await client.close();
        }

}
run().catch(console.dir);