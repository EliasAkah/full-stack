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

//root component or root file any changes we want to affect all our pages should be done here
// Component => all the page components that will be rendered
//pageProps => represents the props or values that will be passed to our page components
