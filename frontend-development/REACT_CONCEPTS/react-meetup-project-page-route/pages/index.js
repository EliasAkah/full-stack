import { MongoClient } from "mongodb";
import Head from "next/head";

import MeetupList from "../components/meetups/MeetupList";

function HomePage(props) {
  return (
    <>
      <Head>
        <title>React MeetUps</title>
        <meta name="description" content="A List of Prominent React MeetUps" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

//a function with reserved name getStaticProps use to handle page pre-rendering during project
export async function getServerSideProps() {
  //fetch data from ApI
  const client = new MongoClient(
    "REMOVED_SECRET/?retryWrites=true&w=majority&appName=MeetUps"
  );

  try {
    await client.connect();
    const db = client.db("meetups");
    const meetups = await db.collection("meetups").find().toArray(); //convert fetched objects into an array;

    if (!meetups) {
      return {
        notFound: true,
      };
    }

    console.log("these are meet up details:", meetups);

    return {
      props: {
        meetups: meetups.map((meetup) => ({
          title: meetup.title,
          address: meetup.address,
          image: meetup.image,
          id: meetup._id.toString(),
        })), //returns an array of objects
      },
    };
  } finally {
    await client.close();
  }
}

//a function that is use to regenerate a static page at every request or when data changes frequently
// export async function getServerSideProps(context) {
// //   const req = context.req;
// //   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export default HomePage;

//NOTE: with useEffect the component undergoes two render cycle before displaying the output to the client.
// i.e the function component first render, after that the useEffect is executed causing the state to be updated.
//the updated state causes the function component to re-render again with the updated value.
// during the first render the loadedMeetups has an empty array as its value, while during the second render
//loadedMeetups takes DUMMY_MEETUPS as its value, it's this updated state which is then outputed to ur screen,
//if the file or detabase u want to fetch the data from actually contains a data. if no data then it will just render
// a blank page on the screen indicating that ur database or file is empty.

//in nextjs the value of loadedMeetups during the first render is what is taking and outputed during page pre-rendering.

//getStaticProps is called by nextjs to ensure the handling of data at the server side during project build
//it manages page pre-rendering to ensure that the output that is render to the client side is one that contains
//the update data after the data has been fetched from the server-side.

// it does not execute either at the server or client but only during project build for static pages.

//codes in getServerSideProps runs only on the server side. and should be used only when u want to regenerate a page at every request
//or when data changes frequently. or when we want to access the req or res object for further manipulation or use in our code

//we export the getStaticProps and getServerSideProps since nextjs cannot automatically call them if they are not explicitly exported
//thus, it enables to automatically call them during the project building.

// getStaticProps and getServerSideProps runs during build up or over the server respectively

//any module imported and used inside getStaticProps and getServerSideProps will not be included in the client bundle

//getStaticProps will pre-render the user with the data that is received from the database
//the code in getStaticProps will execute each time the page is regenerated and not for any coming request.
//it also runs when we revalidate and during the build process.

//MongoClient must be used inside getStaticProps and getServerSideProps function block since they will need to call it again each time the page is revalidated
//if it is left outside those function it will only be called once which during pre-render and may cause error issues llike ❌ MongoExpiredSessionError
// ❌ MongoTopologyClosedError Because the same instance is being reused after it’s been closed when the page is revalidated. the same should be done for getStaticPaths.

//Development (next dev)	Next.js runs all data fetching functions (getStaticProps, getServerSideProps) on every request for easier debugging.
//Production (on Vercel)	getStaticProps only runs at build time, and then after revalidate time passes, and only when a new request is made.

// getServerSideProps() => This forces the homepage to re-fetch from MongoDB on every request, avoiding the delay from ISR.
