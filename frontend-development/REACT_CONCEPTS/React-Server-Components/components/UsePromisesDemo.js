"use client";

import { use, useState } from "react";

export default function UsePromiseDemo({ usersPromise }) {
  const users = use(usersPromise);
  const [count, setCount] = useState(0);

  return (
    <div className="rsc">
      <h2>RSC with Data Fetching</h2>
      <p>
        Uses <strong>async / await</strong> for data fetching.
      </p>
      <p>
        <button
          onClick={() => {
            setCount((prevCount) => prevCount + 1);
          }}
        >
          increment
        </button>{" "}
        {count}
      </p>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.title})
          </li>
        ))}
      </ul>
    </div>
  );
}

//Suspense can be used on server components that returns a promise which is then passed as a value to
//the use() hook inside the client component. when the use() hook is called it waits for the promise to resolve
//and it intergrates with the Suspense hook to display the fallback value while the promise is still resolving
// and output the content of the component wrapped inside the Suspense component when the promise is resolved
//Supense is also used when we use libraries that supports the use of Suspense component.
