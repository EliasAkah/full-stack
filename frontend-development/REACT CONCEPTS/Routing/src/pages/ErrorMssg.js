import MainNav from "../components/MainNavigation";

function ErrorMssg() {
  return (
    <>
      <MainNav />
      <main>
        <h1>An error occured!</h1>
        <p>Could not find Page!</p>
      </main>
    </>
  );
}

export default ErrorMssg;
