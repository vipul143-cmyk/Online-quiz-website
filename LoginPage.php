<?php
session_start();

// Database connection details
$servername = "localhost";
$dbusername = "root";
$dbpassword = "";
$database = "registerdata";

// Create connection
$conn = new mysqli($servername, $dbusername, $dbpassword, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if form submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user = $conn->real_escape_string($_POST['username']);
    $pass = $conn->real_escape_string($_POST['password']);

    // Check user credentials in database
    $sql = "SELECT * FROM registervs WHERE User_name='$user' AND Password='$pass'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // User found - login success
        $_SESSION['username'] = $user; // Save username in session if you want

        // Redirect to home page or dashboard
        header("Location: Home.html");
        exit();
    } else {
        // User not found or wrong password
        echo "<script>alert('Invalid username or password'); window.history.back();</script>";
        exit();
    }
} else {
    // If accessed without POST, redirect to login page
    header("Location: Login_Page.html");
    exit();
}

$conn->close();
?>
