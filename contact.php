<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection details
$servername = "localhost";
$username = "root";
$password = "";
$database = "contact";
$table = "student_feedback";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Create table if it doesn't exist
$sql_create_table = "CREATE TABLE IF NOT EXISTS $table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Full_Name VARCHAR(255) NOT NULL,
    Email_Address VARCHAR(255) NOT NULL,
    Mobile_Number VARCHAR(20) NOT NULL,
    Email_Subject VARCHAR(255) NOT NULL,
    Your_Message TEXT NOT NULL
)";
$conn->query($sql_create_table);

// Handle form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (
        isset($_POST['full_name'], $_POST['email'], $_POST['mobile_number'], $_POST['email_subject'], $_POST['message']) &&
        !empty(trim($_POST['full_name'])) && !empty(trim($_POST['email'])) &&
        !empty(trim($_POST['mobile_number'])) && !empty(trim($_POST['email_subject'])) &&
        !empty(trim($_POST['message']))
    ) {
        $full_name = trim($_POST['full_name']);
        $email = trim($_POST['email']);
        $mobile_number = trim($_POST['mobile_number']);
        $email_subject = trim($_POST['email_subject']);
        $message = trim($_POST['message']);

        $stmt = $conn->prepare("INSERT INTO $table (Full_Name, Email_Address, Mobile_Number, Email_Subject, Your_Message) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("sssss", $full_name, $email, $mobile_number, $email_subject, $message);

        if ($stmt->execute()) {
            echo "<script>alert('Thank you for contacting us! Your message has been received.'); window.location.href='Contact.html';</script>";
        } else {
            echo "Error saving data: " . $stmt->error;
        }

        $stmt->close();
    } else {
        echo "Please fill all the fields correctly.";
    }
} else {
    echo "Invalid request method.";
}

$conn->close();
?>
