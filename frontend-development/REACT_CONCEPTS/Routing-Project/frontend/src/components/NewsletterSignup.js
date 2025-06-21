import { useFetcher } from "react-router-dom";
import { useEffect } from "react";
import classes from "./NewsletterSignup.module.css";

function NewsletterSignup() {
  const fetcher = useFetcher();
  const { data, state } = fetcher;

  useEffect(() => {
    console.log("what is the current State?", state);

    if (data && data.message && state === "idle") {
      console.log("what is the current State now?", state);
      window.alert(data.message);
    }
  }, [data, state]);

  return (
    <fetcher.Form
      action="/Newsletter"
      method="post"
      className={classes.newsletter}
    >
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;
