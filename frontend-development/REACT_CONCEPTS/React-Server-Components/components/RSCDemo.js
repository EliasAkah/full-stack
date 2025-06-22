export default async function RSCDemo() {
  console.log('RSCDemo rendered');
  return (
    <div className='rsc'>
      <h2>A React Server Component</h2>
      <p>
        Will <strong>ONLY</strong> be rendered on the server or at build time.
      </p>
      <p>
        <strong>NEVER</strong> on the client-side!
      </p>
    </div>
  );
}

//importance of server component
// 1, reduces the amount of code executed on the client.
//2 allows data to be fetched from the server rather than on the client thus reducing the delay in data fetching
//3 uses aync keyword thus allowing us to fetch data directly within it without using the useEffect hook