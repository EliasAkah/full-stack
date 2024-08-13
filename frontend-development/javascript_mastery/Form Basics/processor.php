<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Php validation</title>
</head>

<body>
    <h1>Processed Data</h1>

    <?php
        if(isset($_POST['comments'])){
            $name = $_POST['name'];
            $email = $_POST['email'];
            $url = $_POST['url'];
            $comments = $_POST['comments'];
            $submit = $_POST['send'];

            echo "<p>Name: $name</p>";
            echo "<p>Email: $email</p>";
            echo "<p>Url: $url</p>";
            echo "<p>Comments: $comments</p>";
            echo "<p>Submit: $submit</p>";
        }
    ?>
</body>

</html>