import { calculateInvestmentResults, formatter } from '../util/investment.js';


export default function Results({ input }) {
  const results = [];//writing this within the  component function ensures that a new array is created immediately any of the input values changes
  //if it was add above each time there is a re-render of the component a new array value is added to the previous existing values. therefore
  //causing the array to grow.
  calculateInvestmentResults(input, results);

  //when ever we are pushing, or fetching data from a url, database, or data file we should createa error handling process
  //to quickly identify when the data is not fetch or received by the expectd variable. Example:
  if(results.length === 0){
    return <p className = "center">No data is received</p>    
  }

  const initialInvestment =
    results[0].valueEndOfYear -
    results[0].interest -
    results[0].annualInvestment;

  return (
    <table id="result">
      <thead>
        <tr>
          <th>Year</th>
          <th>Investment Value</th>
          <th>Interest (Year)</th>
          <th>Total Interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>
      <tbody>
        {results.map((yearData) => {
          const totalInterest =
            yearData.valueEndOfYear -
            yearData.annualInvestment * yearData.year -
            initialInvestment;
          const totalAmountInvested = yearData.valueEndOfYear - totalInterest;

          return (
            <tr key={yearData.year}>
              <td>{yearData.year}</td>
              <td>{formatter.format(yearData.valueEndOfYear)}</td>
              <td>{formatter.format(yearData.interest)}</td>
              <td>{formatter.format(totalInterest)}</td>
              <td>{formatter.format(totalAmountInvested)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
