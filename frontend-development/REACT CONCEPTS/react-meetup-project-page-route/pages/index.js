//our-domain.com/
import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A First Meetup",
    image:
      "https://hips.hearstapps.com/hmg-prod/images/screen-shot-2019-12-10-at-12-15-40-pm-1575998170.png?crop=1xw:1xh;center,top&resize=980:*",
    address: "Florence, Italy",
    description: "This is a first meetup!",
  },
  {
    id: "m2",
    title: "A Second Meetup",
    image:
      "https://hips.hearstapps.com/hmg-prod/images/screen-shot-2019-12-10-at-12-14-03-pm-1575998085.png?crop=1xw:1xh;center,top&resize=980:*",
    address: "St. Petersburg, Russia",
    description: "This is a second meetup!",
  },
  {
    id: "m3",
    title: "A Third Meetup",
    image:
      "https://hips.hearstapps.com/hmg-prod/images/screen-shot-2019-12-10-at-12-18-04-pm-1575998342.png?crop=1xw:1xh;center,top&resize=980:*",
    address: "Charleston, South Carolina",
    description: "This is a third meetup!",
  },
  {
    id: "m4",
    title: "A Fourth Meetup",
    image:
      "https://hips.hearstapps.com/hmg-prod/images/screen-shot-2019-12-10-at-12-32-12-pm-1575999250.png?crop=1xw:1xh;center,top&resize=980:*",
    address: "Bruges, Belgium",
    description: "This is a fourth meetup!",
  },
];
function HomePage(props) {
  return (
    <>
      <h1>Welcome to the HomePage</h1>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

//a function that is use to regenerate a page at every request or when data changes frequently
// export async function getServerSideProps(context) {
// //   const req = context.req;
// //   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

//a function with reserved name getStaticProps use to handle page pre-rendering during project
export async function getStaticProps() {
  //fetch data from ApI

  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
    revalidate: 1, //ensures ur page is regenerated according to the number of secs assigned after deployment
  };
}

export default HomePage;

//NOTE: with useEffect the undergoes two render cycle before displaying the output to the client.
// i.e the function component first render, after that the useEffect is executed causing the state to be updated.
//the updated state causes the function component to re-render again with the updated value.
// during the first render the loadedMeetups has an empty array as its value, while during the second render
//loadedMeetups takes DUMMY_MEETUPS as its value.

//in nextjs the value of loadedMeetups during the first render is what is taking and outputed during page pre-rendering.

//getStaticProps is called by nextjs to ensure the handling of data at the server side during project build
//it manages page pre-rendering to ensure that the output that render to the client side is one that contains
//the update data after the data has been fetched from the server-side.

// it does execute either at the server or client but only during project build for static pages.

//codes in getServerSideProps runs only on the server side. and should be used only when u want to regenerate a page at every request
//or when data changes frequently. or when we want to access the req or res object for further manipulation or use in our code
