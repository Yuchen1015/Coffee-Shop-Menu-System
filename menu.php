<?php
    // Define the database connection details
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "crazycoffee_db";

    // Create a connection to the database
    $conn = new mysqli($servername, $username, $password, $dbname);

    if(isset($_POST['cart'])) {
    // Get the cart data
      $cart = $_POST['cart'];

    // Prepare a statement to insert the data into the database
    $stmt_1 = $conn->prepare("INSERT INTO orders (title, size, syrup, shot) VALUES (Item_Name, Item_Size, Shot)"); // Get the current value of the number from the database
    $stmt_2 = "UPDATE inventory SET Ingredient_Count = Ingredient_Count - 1 WHERE Menu_ID = (SELECT Menu_ID FROM menu WHERE Menu_Item_ID = $item_name"; // Update inventory
    $stmt_3 = "UPDATE inventory SET Ingredient_Count = Ingredient_Count - $shot WHERE Ingredient_ID = 38"; // Update shot count
    $stmt_4 = "UPDATE inventory SET Ingredient_Count = Ingredient_Count - 1 WHERE Ingredient_ID = $syrup_ID"; // Update syrup count
    $ticket = "SELECT * INTO OUTFILE 'Orderout.csv' FIELDS TERMINATED BY ',' ENCLOSED BY '\"' LINES TERMINATED BY '\n' FROM orders"; //Outputs the orders to a file
    $ClearOrder = "TRUNCATE TABLE orders";//Removes the data from order area

    // Loop through the items in the cart
    foreach($cart as $item) {
    $title = $item['title'];
    $size = $item['sizeContent'];
    $syrup = $item['syrupContent'];
    $shot = $item['shotContent'];
    $join = " - ";

    $item_name = $title . $join . $size;

    //Put the Shots in number form
    if ($shot = "single") {
      $shot = 1;
    }
    elseif ($shot = "Double") {
      $shot = 2;
    }
    else {
      $shot = 3;
    }

    //Find Ingredient_ID for the syrup
    if ($shot = "vanilla") {
      $syrup_ID = 27
      if ($conn->query($stmt_4) !== TRUE) {
      }
    }
    elseif ($shot = "chocolate") {
      $syrup_ID = 28
      if ($conn->query($stmt_4) !== TRUE) {
      }
    }
    elseif ($shot = "caramel") {
      $syrup_ID = 29
      if ($conn->query($stmt_4) !== TRUE) {
      }
    }
    elseif ($shot = "plain") {
      $syrup_ID = 30
      if ($conn->query($stmt_4) !== TRUE) {
      }
    }
    elseif ($shot = "hazelnut") {
      $syrup_ID = 31
      if ($conn->query($stmt_4) !== TRUE) {
      }
    }
    elseif ($shot = "toffee") {
      $syrup_ID = 32
      if ($conn->query($stmt_4) !== TRUE) {
      }
    }
    else {
    }

    //Execute statements
    if ($conn->query($stmt_2) !== TRUE) {
    }

    if ($conn->query($stmt_3) !== TRUE) {
    }

    // Bind the data to the prepared statement
    $stmt_1->bind_param("sss", $title, $size, $syrup, $shot);

    // Execute the prepared statement
           $stmt_1->execute();
    }

    // Execute the ticket creater
    if ($conn->query($ticket) !== TRUE) {
      }

    if ($conn->query($ClearOrder) !== TRUE) {
      }

    // Send a response back to the JavaScript code
    echo 'Purchase successful!';
    }

    //Close program
    $mysqli->close();
    }
?>