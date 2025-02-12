<?php
session_start();
include('db.php');

// Ensure the user is logged in
if ($_SESSION['role'] != 'user') {
    header('Location: login.php');
    exit();
}

$user_id = $_SESSION['user_id'];

// Get all books from the database
$books_result = $conn->query("SELECT * FROM books");

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['add_to_readlist'])) {
    $book_id = $_POST['book_id'];

    // Insert the book into the user's readlist
    $sql = "INSERT INTO readlist (user_id, book_id) VALUES ($user_id, $book_id)";
    $conn->query($sql);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booklist - ReadRight</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>Booklist</h1>
    </header>

    <nav>
        <a href="user_profile.php">Profile</a>
        <a href="booklist.php">Booklist</a>
        <a href="reviews.php">Reviews</a>
        <a href="logout.php">Logout</a>
    </nav>

    <div class="container">
        <h2>All Available Books</h2>
        <table border="1" cellspacing="0" cellpadding="10">
            <thead>
                <tr>
                    <th>Thumbnail</th>
                    <th>Name</th>
                    <th>Genre</th>
                    <th>Writer</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <?php while ($book = $books_result->fetch_assoc()) { ?>
                    <tr>
                        <td>
                            <!-- Display book thumbnail if available -->
                            <?php if ($book['thumbnail']) { ?>
                                <img src="<?php echo $book['thumbnail']; ?>" alt="Thumbnail" width="100" height="150">
                            <?php } else { ?>
                                <img src="default-thumbnail.jpg" alt="Default Thumbnail" width="100" height="150">
                            <?php } ?>
                        </td>
                        <td><?php echo $book['name']; ?></td>
                        <td><?php echo $book['genre']; ?></td>
                        <td><?php echo $book['writer']; ?></td>
                        <td>
                            <!-- Add to readlist form -->
                            <form method="POST" action="booklist.php" style="display:inline;">
                                <input type="hidden" name="book_id" value="<?php echo $book['id']; ?>">
                                <button type="submit" name="add_to_readlist">Add to Readlist</button>
                            </form>
                        </td>
                    </tr>
                <?php } ?>
            </tbody>
        </table>
    </div>
</body>
</html>
