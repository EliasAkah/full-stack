import "../styles/globals.css";

import Layout from "../components/layout/Layout";
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;

//MyApp is the root component or root file of the application. it is used to wrap all other components 
// that may be used in the application. Any changes we want to affect all our pages should be done here
// Component => all the page components that will be rendered
//pageProps => represents the props or values that will be passed to our page components

//NOTE: Nextjs is all about filesystem routing.
//for app router => only files or folders inside the app folder are considered routes
//for page router => only files or folders inside the page folder are considered routes
