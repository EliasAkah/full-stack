//our-domain.com/news/something-important

import { useRouter } from "next/router";

function SomethingImportantPage() {
  const router = useRouter();
  const newsId = router.query.newsId;
  return <h1>Welcome to the {newsId} Detail Page</h1>;
}

export default SomethingImportantPage;
