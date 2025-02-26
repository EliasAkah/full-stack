import {MongoClient} from "mongodb"

const url = "mongodb+srv://davidakah1999:08038838681@nodeprojects.cn9hq.mongodb.net/?retryWrites=true&w=majority&appName=NodeProjects"
//link application to the Mongo atlas server
const client = new MongoClient(url);

async function run(){
    try{
        const database = client.db("sample_mflix");
        const movies = database.collection("movies");

        // Create a filter for movies with the title "Random Harvest"
        const filter = {title: "Random Harvest"};

        /* Set the upsert option to insert a document if no documents match
        the filter */
        const options = {upsert: true};

        // Specify the update to set a value for the plot field
        const updateDoc = {
            $set: {
                plot: `A harvest of random numbers, such as: ${Math.random()}`,
            }
        }

        //update the first document that matches the filter
        const result =  await movies.updateOne(filter, updateDoc, options);//the same goes for updateMany()
        
        //Print the number of matching and modified documents
        console.log(`${result.matchedCount} document(s) matched the filter, ${result.modifiedCount} document(s)`,);
    }finally{
        await client.close()
    }
}
run().catch(console.dir)
/*
updateOne(filter, update, options?)
updateMany(filter, update, options?)
 $set update operator specifies update values for document fields
NOTE:
1) Set the upsert option to true to create a new document if no documents match the filter
2) updateOne() throws an exception if an error occurs during execution. 
3) If you specify a value in your update document for the immutable field _id, the method throws an exception.
4)If your update document contains a value that violates unique index rules, the method throws a duplicate key error exception.
5) If your application requires the document after updating, consider using the collection.findOneAndUpdate(). method, which has a similar interface to updateOne() but also returns the original or updated document.
*/