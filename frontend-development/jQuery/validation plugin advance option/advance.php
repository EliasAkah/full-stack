<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Awsome Form Processor Page</title>
</head>

<body>

    <h1>Processed Data</h1>

    <?php
        if($_SERVER["REQUEST_METHOD"] == "POST"){

            $name = $_POST['name'];
            $email = $_POST['email'];
            $phone = $_POST['phone'];
            $contacttype = $_POST['contacttype'];
            $cheeses = $_POST['cheeses'];
            $cheesetype = $_POST['cheesetype'];
            $comments = $_POST['comments'];

            if(!empty($name) && !empty($email) && !empty($phone) && !empty($cheeses) && !empty($cheesetype)){
                "/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/";
    
                // for handling array
                $cheese_list = "";
    
                foreach($cheeses as $eachcheese){
                    $cheese_list .= $eachcheese . ", ";
                }
    
                // cuts off the final ', '
                $cheese_list = substr($cheese_list, 0, -2);
    
                if(preg_match($re_email, $email)){
    
                    echo "<p>name: $name</p>";
                    echo "<p>email: $email</p>";
                    echo "<p>phone: $phone</p>";
                    echo "<p>contacttype: $contacttype</p>";
                    echo "<p>cheeses: $cheeses</p>";
                    echo "<p>cheesetype: $cheesetype</p>";
                    echo "<p>comments: $comments</p>";
    
                }
                else{
                    echo "you did not format your email properly";
                }
            }
            else{
                echo "you did not fill int he required fields";
            }
        }


    ?>
</body>

</html>