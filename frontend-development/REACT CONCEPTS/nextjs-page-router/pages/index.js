//our-domain.com/

import Link from "next/link";

function HomePage() {
  return (
    <>
      <h1>Welcome to the Homepage</h1>
      <ul>
        <li>
          <Link href="/news/something-happened">
            Click me to see what happened
          </Link>
        </li>
        <li>
          <Link href="/news/nextjs">Click me to see NextJs</Link>
        </li>
      </ul>
    </>
  );
}

export default HomePage;
