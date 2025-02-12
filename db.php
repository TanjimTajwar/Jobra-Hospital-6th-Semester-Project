<?php
$host = 'localhost'; // Database server
$username = 'root'; // Your database username
$password = ''; // Your database password (leave empty if using no password)
$dbname = 'readright'; // Your database name

// Create connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
