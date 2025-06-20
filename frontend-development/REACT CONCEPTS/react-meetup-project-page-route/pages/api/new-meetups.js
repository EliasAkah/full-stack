import { MongoClient } from "mongodb";

const url =
  "REMOVED_SECRET/?retryWrites=true&w=majority&appName=MeetUps";

const client = new MongoClient(url);

export async function NewMeetUp(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    try {
      await client.connect();
      const db = client.db("meetups"); //creates a database if not created;
      const meetupsCollection = db.collection("meetups");
      const result = await meetupsCollection.insertOne(data); //add only one document to the collection in meetups database
      console.log("inserted Data: ", result);

      return res
        .status(201)
        .json({ message: "Successfully added a new meetup" });
    } catch (error) {
      console.error("❌ MongoDB Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

export default NewMeetUp;

//api folder provides us with an api route. each of the file in this folder
// provides an api route that can be used to retrieve data from and write data to the database or file.
//files in api folder only runs on the server side none of codes written here will ever reflect on the client side
//thus is safe to use ur credentials here.
