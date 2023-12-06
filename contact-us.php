<?php
    // Define the database connection details
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "crazycoffee_db";

    // Create a connection to the database
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Check if form has been submitted
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {

        $txtName = $_POST['txtName'];
        $txtEmail = $_POST['txtEmail'];
        $txtPhone = $_POST['txtPhone'];
        $txtMessage = $_POST['txtMessage'];

        // database insert SQL code
        $sql = "INSERT INTO `cc_contact` (`Id`, `fldName`, `fldEmail`, `fldPhone`, `fldMessage`) VALUES ('0', '$txtName', '$txtEmail', '$txtPhone', '$txtMessage')";

        // insert in database 
        if ($conn->query($sql) === TRUE) {
            echo "Thank You for your Time!";
        } else {
            echo "Contact Us Failed: " . $conn->error;
        }

        //Close connection
        $conn->close();
    }
?>
