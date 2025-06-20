import { MongoClient, ObjectId } from "mongodb";

import Head from "next/head";

import MeetDetail from "../../components/meetups/MeetupDetail";
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

// pre-generate page at every request
export async function getServerSideProps(context) {
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

// Why Use getServerSideProps?
// No need to worry about revalidate timing.

// Page is generated at request time (not at build time).

// Always shows the latest data from your MongoDB.
