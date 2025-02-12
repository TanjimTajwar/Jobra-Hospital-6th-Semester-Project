<?php
include('db.php'); // Include the database connection file

session_start();

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Hardcode the check for admin user
    if ($email == 'sifat@gmail.com' && $password == '22701068') {
        // Create a session for admin user
        $_SESSION['email'] = $email;
        $_SESSION['role'] = 'admin'; // Hardcode role as admin
        header('Location: admin_profile.php'); // Redirect to admin profile
        exit();
    }

    // Check the database for other users
    $sql = "SELECT * FROM users WHERE email = '$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // User exists, fetch the user details
        $user = $result->fetch_assoc();
        
        // Verify the password (ensure it's hashed in the database)
        if (password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['role'] = $user['role'];

            // Redirect based on user role
            if ($user['role'] == 'admin') {
                header('Location: admin_profile.php');
            } else {
                header('Location: user_profile.php');
            }
            exit();
        } else {
            echo "Invalid password!";
        }
    } else {
        echo "No user found!";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - ReadRight</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>ReadRight - Login</h1>
    </header>

    <nav>
        <a href="index.php">Home</a>
        <a href="register.php">Register</a>
        <a href="login.php">Login</a>
        <a href="help.php">Help</a>
    </nav>

    <div class="container">
        <h2>Login</h2>
        <form method="POST" action="login.php">
            <input type="email" name="email" placeholder="Email" required>
            <input type="password" name="password" placeholder="Password" required>
            <button type="submit">Login</button>
        </form>
    </div>
</body>
</html>
