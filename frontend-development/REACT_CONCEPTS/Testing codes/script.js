const form = document.getElementById("form");
const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const formData = new FormData(form);

    formData.append("intent", event.target.value);

    const entries = [...formData.entries()]; //data is returned in as array of arrays
    //where each array inside an the entries array contains a key and a value => [key, value]

    const output = document.getElementById("output");

    output.innerHTML = entries
      .map(([key, value]) => `<p><strong>${key}: </strong> ${value}</p>`)
      .join("");
  });
});

//formData.entries() => an iterator that produces each key value pair as an array
//{[key, value], [key,value]}
//when ever return is seen i a synchronous operation any expression after the return statement does not execute.
