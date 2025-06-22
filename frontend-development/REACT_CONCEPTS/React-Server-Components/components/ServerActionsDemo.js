import fs from "node:fs";

import { saveUserAction } from "../actions/serverFunction";

export default function ServerActionsDemo() {
  return (
    <div className="rsc">
      <h2>Server Actions</h2>
      <p>
        A "Form Action" converted to a "Server Action" via{" "}
        <strong>"use server"</strong>.
      </p>
      <p>Can be defined in a server component or a separate file.</p>
      <p>Can be called from inside server component or client component.</p>
      <form action={saveUserAction}>
        <p>
          <label htmlFor="name">User name</label>
          <input type="text" id="name" name="name" required />
        </p>
        <p>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" required />
        </p>
        <p>
          <button>Save User</button>
        </p>
      </form>
    </div>
  );
}

//server Actions are form Actions executed on the server rather than on the client
//we "use server" to conver a form action to a server action. when the form action is within a
// component(server component) 'use server' is called inside the function block. but the function is written
//in a separate file and exported it 'use server' is written outside the function block.
//server Action can also be used in client component when building application with nextjs,
//by importing it from the file where it is written and the using it the client component.
//Note: it must not be directly written inside the client component.
