import Head from "next/head";
import { useRouter } from "next/router";

import NewMeetupForm from "../../components/meetups/NewMeetupForm.js";

function NewMeetupPage() {
  const router = useRouter();

  async function handleNewMeetup(enteredFormData) {
    try {
      const response = await fetch("/api/new-meetups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(enteredFormData),
      });

      const resData = await response.json();

      return resData;
    } catch (error) {
      console.log(error.message);
      return { message: error.message };
    } finally {
      console.log("Fetching process is finished");
    }
  }

  return (
    <>
      <Head>
        <title>Add New MeetUp</title>
        <meta
          name="description"
          content="Add Your React MeeetUp for better Networking Opportunities"
        />
      </Head>
      <NewMeetupForm onAddMeetup={handleNewMeetup} />;
    </>
  );
}
export default NewMeetupPage;

//ALL built in function are imported within a curly bracket from there module.
// while none function should not be imported within a curly bracket.
