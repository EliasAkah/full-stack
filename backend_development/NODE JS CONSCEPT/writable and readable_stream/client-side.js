//sending a request to the above server
fetch("http://localhost:4000", { method: "POST", body: "hello server" })
    .then((resp) => resp.text())
    .then(text => console.log(text));