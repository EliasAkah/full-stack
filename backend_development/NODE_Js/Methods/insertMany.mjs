import {MongoClient} from "mongodb";

const url = "mongodb+srv://davidakah1999:08038838681@nodeprojects.cn9hq.mongodb.net/?retryWrites=true&w=majority&appName=NodeProjects";
const client = new MongoClient(url);


async function run(){
    try{
        await client.connect();

                 // Connect to the database and collection on which to run the operation
                 const database = client.db("insertDB");
                 const food = database.collection("food");

                 //creating and array of new docs to insert
                 const docs = [
                    { name: "cake", healthy: false },
                    { name: "lettuce", healthy: true },
                    { name: "donut", healthy: false }
                  ];

                  // Prevent additional documents from being inserted if one fails
                  const options = {ordered: true};

                  //Execute the insert Operation
                  const result = await food.insertMany(docs, options);

                  //print result
                  console.log(`${result.insertedCount} documents were inserted`)

    }finally{
        await client.close();
    }
}
run().catch(console.dir);

/*
insertMany(docs, options) takes an array of documents to insert into the specified collection.
NOTE: Specify ordered:true to prevent inserting the remaining documents if the insertion failed for a previous document in the array.
*/