import {MongoClient} from "mongodb"
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.MONGO_URI;
const port  = process.env.PORT;
//link application to the Mongo atlas server
const client = new MongoClient(url);

async function run(){
    try{
        const database = client.db("sample_mflix");
        const movies = database.collection("movies");

        // Create a filter for documents where the title contains "The Cat from"
        const query = {title: {$regex: "The Cat from"}};

        /* Set the upsert option to insert a document if no documents match
        the filter */
        const options = {upsert: true};

        // Specify the replacement doc that will replace existing doc
        const replacementDoc = {
            
                title: `The Cat from Sector ${Math.floor(Math.random() * 1000) + 1}`,
            
        }

        //Execute replace operation
        const result =  await movies.replaceOne(query, replacementDoc);
        
        //Print the number of matching and modified documents
        console.log(`Modified ${result.modifiedCount} document(s)`);
    }finally{
        await client.close()
    }
}
run().catch(console.dir)
/*
replaceOne(filter, replacement, options?) Replace a document in a collection with another document
NOTE:
1)This operation removes all fields and values in the original document and replaces them with the fields and values in the replacement document.
2) The value of the _id field remains the same unless you explicitly specify a new value for _id in the replacement document.
3) You can specify more options, such as upsert, using the optional options parameter.
4)If your application requires the document after updating, use the collection.findOneAndReplace() method which has a similar interface to replaceOne().
You can configure findOneAndReplace() to return either the original matched document or the replacement document.

WARNING: 
The replaceOne() method throws an exception if an error occurs during execution.
 For example, if you specify a value that violates a unique index rule, replaceOne() throws a duplicate key error.
*/