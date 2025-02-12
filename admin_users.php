<?php
session_start();
if ($_SESSION['role'] != 'admin') {
    header('Location: login.php');
    exit();
}

include('db.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['remove_user'])) {
    $user_id = $_POST['user_id'];
    $sql = "DELETE FROM users WHERE id = $user_id";
    $conn->query($sql);
}

$users_result = $conn->query("SELECT * FROM users");

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Users - ReadRight</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>Manage Users</h1>
    </header>

    <nav>
        <a href="admin_profile.php">Books</a>
        <a href="admin_users.php">Users</a>
        <a href="logout.php">Logout</a>
    </nav>

    <div class="container">
        <h2>Existing Users</h2>

        <form method="POST" action="admin_users.php">
            <select name="user_id">
                <?php while ($user = $users_result->fetch_assoc()) { ?>
                    <option value="<?php echo $user['id']; ?>"><?php echo $user['username']; ?></option>
                <?php } ?>
            </select>
            <button type="submit" name="remove_user">Remove User</button>
        </form>

        <h3>User List</h3>
        <ul>
            <?php while ($user = $users_result->fetch_assoc()) { ?>
                <li><?php echo $user['username']; ?> (<?php echo $user['email']; ?>)</li>
            <?php } ?>
        </ul>
    </div>
</body>
</html>
