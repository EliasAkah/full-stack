const deleteProduct = (btn) => {
  const prodId = btn.parentElement.querySelector("[name='productId']").value;
  const csrfToken = btn.parentElement.querySelector("[name='_csrf']").value;

  const productElement = btn.closest("article"); // target the closest article element
  console.log(prodId);

  fetch(`/admin/product/${prodId}`, {
    method: "DELETE",
    headers: {
      "csrf-token": csrfToken,
    },
  })
    .then((result) => {
      return result.json(); //returning the promise after parsing the json data
    })
    .then((data) => {
      console.log(data);
      productElement.parentNode.removeChild(productElement); //removes the article which is parent of the the delete button that was clicked.
    })
    .catch((err) => {
      console.log(err);
    });
};
