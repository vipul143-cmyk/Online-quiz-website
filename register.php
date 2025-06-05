<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "registerdata";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get values from form
    $name = $conn->real_escape_string($_POST['name']);  // User_name
    $email = $conn->real_escape_string($_POST['email']);  // Email
    $password = $conn->real_escape_string($_POST['password']);  // Password
    $confirm_password = $conn->real_escape_string($_POST['confirm_password']);  // Confirm_Password

    // Check password match
    if ($password !== $confirm_password) {
        echo "<script>alert('Password and Confirm Password do not match!'); window.history.back();</script>";
        exit();
    }

    // Check if same User_name already exists with same email or password
    $check_sql = "SELECT * FROM registervs WHERE User_name = '$name' AND (Email = '$email' OR Password = '$password')";
    $check_result = $conn->query($check_sql);

    if ($check_result->num_rows > 0) {
        // User with same name and email or password already exists
        echo "<script>alert('User with same name and same email or password already exists. Please use different email or password.'); window.history.back();</script>";
        exit();
    }

    // Insert data into database
    $sql = "INSERT INTO registervs (User_name, Email, Password, Confirm_Password)
            VALUES ('$name', '$email', '$password', '$confirm_password')";

    if ($conn->query($sql) === TRUE) {
        header("Location: Login_Page.html");
        exit();
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>
