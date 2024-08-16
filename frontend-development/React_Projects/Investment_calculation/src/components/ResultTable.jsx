export default function ResultTable({ results, formatter}) {
  console.log("here is the result value", results);
  return (
    <table id="result">
      <thead>
        <tr>
          <th>year</th>
          <th>investment value</th>
          <th>interest (year)</th>
          <th>total interest</th>
          <th>invested capital</th>
        </tr>
      </thead>
      <tbody>
        {results.length > 0 ? (
          results.map((result) => (
            <tr key={result.year}>
              <td>{result.year}</td>
              <td>{formatter.format(result.valueEndOfYear)}</td>
              <td>{formatter.format(result.interest)}</td>
              <td>{formatter.format(result.totalInterest)}</td>
              <td>{formatter.format(result.InvestedCapital)}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5">No data available</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}