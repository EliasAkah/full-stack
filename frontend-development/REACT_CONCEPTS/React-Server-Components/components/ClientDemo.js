"use client";

import { useState } from "react";

export default function ClientDemo({ children }) {
  console.log("ClientDemo rendered");
  const [count, setCount] = useState(); // this is the reason why we converted the component to a client component
  return (
    <div className="client-cmp">
      <h2>A React Client Component</h2>
      <p>
        Will be rendered on the client <strong>AND</strong> the server.
      </p>
      {children}
    </div>
  );
}

//A component must be converted to client component so that we can use React features only ment for 
//client components e.g useState hooks etc.