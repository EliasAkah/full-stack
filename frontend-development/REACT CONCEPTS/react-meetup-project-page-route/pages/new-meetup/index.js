import NewMeetupForm from "../../components/meetups/NewMeetupForm.js";

function NewMeetupPage() {
  function handleNewMeetup(enteredData) {
    console.log(enteredData);
  }

  return <NewMeetupForm onAddMeetup={handleNewMeetup} />;
}

export default NewMeetupPage;
