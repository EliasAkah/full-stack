import { MongoClient, ObjectId } from "mongodb";
import {dotenv} from "dotenv";


import Head from "next/head";
import MeetDetail from "../../components/meetups/MeetupDetail";

dotenv.config();

function MeetupDetails(props) {
  return (
    <>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
      </Head>

      <MeetDetail
        description={props.description}
        address={props.address}
        title={props.title}
        image={props.image}
      />
    </>
  );
}

//function that defines all the dynmic page that are to be pregenerated during project build
export async function getStaticPaths() {
  //fetch data from the server side or ApI
  const client = new MongoClient(
<<<<<<< HEAD
    "REMOVED_SECRET/?retryWrites=true&w=majority&appName=MeetUps"
=======
    process.env.MONGO_URL
>>>>>>> 5a5cd93 (.gitignore file)
  );

  try {
    await client.connect();
    const db = client.db("meetups");
    const meetups = await db.collection("meetups").find().toArray(); //reurns an array of objects with each object containing only the id of their repective document

    if (!meetups) {
      return {
        notFound: true,
      };
    }
    console.log("these are meet up IDs:", meetups);

    const idArray = meetups.map((meetupsId) => ({
      params: { meetupId: meetupsId._id.toString() },
    }));
    console.log("these are meet up IDs:", idArray);

    return {
      paths: idArray,
      fallback: "blocking",
    };
  } catch (error) {
    console.error("Error in getStaticPaths:", error);
    return {
      paths: [],
      fallback: "blocking",
    };
  } finally {
    await client.close(); // ✅ properly closes client per call
  }
}
// pre-generate page during build process
export async function getStaticProps(context) {
  //fetch data from the server side or ApI
  const client = new MongoClient(
    "REMOVED_SECRET/?retryWrites=true&w=majority&appName=MeetUps"
  );

  const meetupID = context.params.meetupId;

  try {
    await client.connect();
    const db = client.db("meetups");
    const meetup = await db
      .collection("meetups")
      .findOne({ _id: new ObjectId(meetupID) }); //returns a document which _id === meetupID(meetupID is wrapped with ObjectId to ensure that the value corresponds with the _id in the database)

    if (!meetup) {
      return {
        notFound: true,
      };
    }
    console.log("these are meetup details:", meetup);

    return {
      props: {
        id: meetup._id.toString(),
        image: meetup.image,
        address: meetup.address,
        title: meetup.title,
        description: meetup.description,
      },
      revalidate: 5,
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      notFound: true,
    };
  } finally {
    await client.close();
  }
}

export default MeetupDetails;

//getStaticPaths => unction used inside a dynamic page component that defines all the dynamic page that are to be pregenerated during project build.
//it used together only with getStaticProps();
//it cannot be used with getServerSideProps or when neither getStaticProps() nor getServerSideProps is used.

//fallback => use tell if all dynamic path has been listed or not
//fallback:true => means all path has not been listed, thus nextjs is allowed to authomatically add them to the paths array.
//fallback:false => means all path has been listed, thus nextjs is not allowed to authomatically add them to the paths array.
//fallback:"blocking" => means all path has not been listed, thus nextjs is allowed to authomatically add them to the paths array.
