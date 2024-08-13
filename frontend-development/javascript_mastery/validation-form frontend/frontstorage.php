<?php

$servername = "localhost";
$username = "david";
$password = 08038838681;

//create connection
$conn = new  mysqli($servername, $username, $password);

//check connection
if($conn -> connect_error){
    die("connnection failed: " / $conn->connect_error);
}

echo "connected successfully";

// defiene error variables for form validation

$nameErr = $emailErr = $telephoneErr = $urlErr = $genderErr = $agreeErr
= "";

$name = $email = $telephone = $url = $gender = $agree = ""; // we use the name when targeting the values of an html element in php

//compoare the method

if($_SERVER["REQUEST_METHOD"] == "POST"){
//empty error verification

if(empty($_POST['name'])){
$nameErr = "Name is required";
}
else{
$name = input_data($_POST['name']);
if(!preg_match("/^[a-zA-Z ]*$/", $name)){
$nameErr = "only alphabets and white space are allowed";
}
}

if(empty($_POST['email'])){
$emailErr = "Email is required";
}
else{
$email = input_data($_POST['email']);

if(!filter_var($email, FILTER_VALIDATE_EMAIL)){

$emailErr = "invalid email format";
}
}

if(empty($_POST['telephone'])){
$telephoneErr = "Mobile no is required";
}
else{
$telephone = input_data($_POST['telephone']);
if(!preg_match("/^[0-9]*$/", $telephone)){
$telephoneErr = "Only numeric value is allowed.";
}
else if((strlen($telephone) != 10)){
$telephoneErr = "Telephone must contain 10 characters";
}
}

//url validation
if(empty($_POST['url'])){
$urlErr = "Website url is required";
}
else{
$url = input_data($_POST['url']);
if(!filter_var($url, FILTER_VALIDATE_URL)){
$urlErr = "invalid URl";
}
}

//radio validation
if(empty($_POST['gender'])){
$genderErr = "Gender is required";
}
else{
$gender = input_data($_POST['gender']);
}

if (!isset($_POST['agree'])){
$agreeErr =
"please accept terms and conditions before submitting the form";
}
else{
$agree = input_data($_POST['agree']);
}
}

function input_data($data){
// remove spaces slashes special symbols

$data = trim($data);
$data = stripslashes($data);
$data= htmlspecialchars($data);

return $data;
}

if(isset($_POST['submit'])){
    if($nameErr == "" && $emailErr == "" && $telephoneErr == "" && $urlErr
    == "" && $genderErr == "" && $agreeErr ==
    ""){
    echo "<h3 color=#FF0001> <b>you have sucessfully registered.</b> </h3>";
    echo "<h2>your input</h2>";
    echo "Name: ".$name;
    echo "<br>";
    echo "Email: ".$email;
    echo "<br>";
    echo "Mobile No: ".$telephone;
    echo "<br>";
    echo "Website: " .$url;
    echo "<br>";
    echo "Gender: ".$gender;
    echo "<br>";
    }
}
?>