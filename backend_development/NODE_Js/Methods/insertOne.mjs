//insertOne(doc,options)
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
        const database = client.db("insertDB");
        const haiku = database.collection("haiku");
    
        //creating a new doc to be added
        const doc = {
            title: "Record of a Shriveled Datum",
            content: "No bytes, no problem. Just insert a document, in MongoDB",
        }
    
        //adding a single document to list of already existing documents i haiku collection
        const result = await haiku.insertOne(doc);
        //printing the ID of the inserted document
        console.log(`A document was inserted with the _id: ${result.insertedId}`);

    }finally{
        await client.close();
    }

}
//Run the fucntion and handle any errors
run().catch(console.dir);