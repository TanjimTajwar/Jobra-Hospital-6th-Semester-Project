<?php
session_start();
if ($_SESSION['role'] != 'admin') {
    header('Location: login.php');
    exit();
}

include('db.php');

// Handle adding a book
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['add_book'])) {
        $name = $_POST['name'];
        $genre = $_POST['genre'];
        $writer = $_POST['writer'];
        $thumbnail = $_POST['thumbnail']; // Get the thumbnail as text (path or URL)

        // Insert book with thumbnail path into the database
        $sql = "INSERT INTO books (name, genre, writer, thumbnail) VALUES ('$name', '$genre', '$writer', '$thumbnail')";
        $conn->query($sql);
    }

    // Handle removing a book
    if (isset($_POST['remove_book'])) {
        $book_id = $_POST['book_id'];

        // Remove the book from the database
        $sql = "DELETE FROM books WHERE id = $book_id";
        $conn->query($sql);
    }
}

// Fetch books from the database
$books_result = $conn->query("SELECT * FROM books");
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Profile - ReadRight</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>Admin Profile</h1>
    </header>

    <nav>
        <a href="admin_profile.php">Books</a>
        <a href="admin_users.php">Users</a>
        <a href="logout.php">Logout</a>
    </nav>

    <div class="container">
        <h2>Manage Books</h2>
        <form method="POST" action="admin_profile.php">
            <input type="text" name="name" placeholder="Book Name" required>
            <input type="text" name="genre" placeholder="Genre">
            <input type="text" name="writer" placeholder="Writer">
            <input type="text" name="thumbnail" placeholder="Thumbnail URL or Path" required> <!-- Text input for the thumbnail -->
            <button type="submit" name="add_book">Add Book</button>
        </form>

        <h3>Existing Books</h3>
        <ul>
            <?php while ($book = $books_result->fetch_assoc()) { ?>
                <li>
                    <?php echo $book['name']; ?> (<?php echo $book['genre']; ?>, <?php echo $book['writer']; ?>)
                    <?php if ($book['thumbnail']) { ?>
                        <img src="<?php echo $book['thumbnail']; ?>" alt="Thumbnail" width="50">
                    <?php } ?>
                    <form method="POST" action="admin_profile.php" style="display:inline;">
                        <input type="hidden" name="book_id" value="<?php echo $book['id']; ?>">
                        <button type="submit" name="remove_book">Remove Book</button>
                    </form>
                </li>
            <?php } ?>
        </ul>
    </div>
</body>
</html>
