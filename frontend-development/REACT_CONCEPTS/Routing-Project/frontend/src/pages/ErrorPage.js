import { useRouteError } from "react-router-dom";
import PageContent from "../components/PageContent";
import MainNavigation from "../components/MainNavigation";

function ErrorPage() {
  const error = useRouteError();

  let title = "An Error Occurred";
  let message = "forgive me error has occurred";

  if (error.status === 500) {
    message = JSON.parse(error.data).message;
  }

  if (error.status === 404) {
    title = "Not Found";
    message = "Could not find resource or page.";
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <h1>{message}</h1>
      </PageContent>
    </>
  );
}

export default ErrorPage;
