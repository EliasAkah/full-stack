import { Suspense } from "react";
import fs from "node:fs/promises";

import UsePromiseDemo from "@/components/UsePromisesDemo";
import ErrorBoundary from "@/components/ErrorBoundary";
import { resolveViewport } from "next/dist/lib/metadata/resolve-metadata";

export default async function Home() {
  const useCreatedPromise = new Promise((resolve, reject) =>
    setTimeout(async () => {
      const data = await fs.readFile("dummy-db.json", "utf-8");
      const users = JSON.parse(data);
      resolve(users); // i am done and i return the data i fetched to u
      //reject(users) //forces a promise to throw an error even when the data is right or wrong
    }, 2000)
  );

  return (
    <main>
      <ErrorBoundary fallback="Failed to Fetch Data">
        <Suspense fallback="Loading Data...">
          <UsePromiseDemo usersPromise={useCreatedPromise} />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
