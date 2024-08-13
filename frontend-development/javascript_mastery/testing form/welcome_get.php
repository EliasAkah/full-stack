<html>

<body>

    <form action="welcome_get.php" method="GET">
        Name: <input type="text" name="name"><br>
        E-mail: <input type="text" name="email"><br>
        <input type="submit">
    </form>

    <?php
    $name = isset($_GET["name"]) ? $_GET["name"] : "";
    $email = isset($_GET["email"]) ? $_GET["email"] : "";
?>
    Welcome <?php echo $_GET["name"]; ?><br>
    Your email address is: <?php echo $_GET["email"]; ?>

</body>

</html>