import Header from "../../Investment_calculation/src/components/Header.jsx";
import UserInput from "../../Investment_calculation/src/components/UserInput.jsx";
import ResultTable from "../../Investment_calculation/src/components/ResultTable.jsx";
import { calculateInvestmentResults } from "./util/investment.js";
import { useState } from "react";
import { formatter } from "./util/investment.js";

function App() {
  const [initialInvestment, setInitialInvestment] = useState(0);
  const [annualInvestment, setAnnualnvestment] = useState(0);
  const [expectedReturn, setexpectedReturn] = useState(0);
  const [duration, setDuration] = useState(0);

  function handleInitialInvestment(e) {
    setInitialInvestment(Number(e.target.value));
  }
  function handleAnnualInvestement(e) {
    setAnnualnvestment(Number(e.target.value));
  }
  function handleexpectedReturn(e) {
    setexpectedReturn(Number(e.target.value));
  }
  function handleDuration(e) {
    setDuration(Number(e.target.value));
  }

  let investmentResults = calculateInvestmentResults({
    initialInvestment,
    annualInvestment,
    expectedReturn,
    duration,
  });

  console.log("here is the investment result", investmentResults);

  return (
    <main>
      <Header />
      <section id="user-input">
        <div className = "input-group">
          <UserInput
            name="initial-investment"
            labelTitle="initial investment"
            onChangeValue={handleInitialInvestment}
            value={initialInvestment}
          />
          <UserInput
            name="annual-investment"
            labelTitle="annual investment"
            onChangeValue={handleAnnualInvestement}
            value={annualInvestment}
          />
        </div>
        <div className = "input-group">
          <UserInput
            name="expected-return"
            labelTitle="expected return"
            onChangeValue={handleexpectedReturn}
            value={expectedReturn}
          />
          <UserInput
            name="duration"
            labelTitle="duration"
            onChangeValue={handleDuration}
            value={duration}
          />
        </div>
      </section>
      <ResultTable results={investmentResults} formatter = {formatter} />
    </main>
  );
}

export default App;

