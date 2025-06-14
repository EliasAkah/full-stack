import { redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login"; // if searchParams.get("mode") is null or undefined, use the string "/login" instead.

  if (mode !== "login" && mode !== "signup") {
    throw new Response(JSON.stringify({ message: "Invalid mode!" }), {
      status: 422,
    });
  }

  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch("http://localhost:8080/" + mode, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  console.log(response);

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Authentication failed!" }), {
      status: 500,
    });
  }

  const resData = await response.json();
  const token = resData.token;

  localStorage.setItem("token", token);
  const expiration =  new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem("expiration", expiration.toISOString());
  
  return redirect("/"); 
}