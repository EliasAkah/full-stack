const {MongoClient} = require('mongodb');
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.MONGO_URI;
const port  = process.env.PORT;


const client = new MongoClient(url);

async function run(){
    try{
        //waiting for the application to connect to the database
        await client.connect();
        //accessing the sample_flix database
        const db = client.db('sample_mflix');
        //accessing the  movie collection in the sample_mflix database
        const collection = db.collection('movies');

        //Find the first document in the collection
        const first =  await collection.findOne();
        console.log(first)
    }finally{
        //Close the database connection when finished or an error occurs
        await client.close();
    }
}
run().catch(console.error);


//Security Note:
//It's a bad idea to hardcode sensitive credentials (like your password) directly into your code. 
// Instead, you should use environment variables to store them securely.

