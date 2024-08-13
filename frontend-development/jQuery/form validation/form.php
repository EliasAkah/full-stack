<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Php validation</title>
</head>

<body>
    <h1>Basic fro </h1>

    <?php
        if($_SERVER["REQUEST_METHOD"] == "POST"){
            $name = $_POST['name'];
            $email = $_POST['email'];
            $url = $_POST['url'];
            $comments = $_POST['comments'];
            $submit = $_POST['send'];

            if(!empty($name) && !empty($email) && !empty($comments)){

                // $re_email = "/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/";

                if(preg_match($re_email, $email)){

                    echo "<p>Name: $name</p>";
                    echo "<p>Email: $email</p>";
                    echo "<p>Url: $url</p>";
                    echo "<p>Comments: $comments</p>";
                    echo "<p>Submit: $submit</p>";
                }
                else{
                    echo "<p>you did not format your email properly</p>";
                }
            }
            else{
                echo "<p>you did not fill in the required fields</p>";
            }

        }
    ?>
</body>

</html>