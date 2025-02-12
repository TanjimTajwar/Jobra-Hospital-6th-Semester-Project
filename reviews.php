<?php
session_start();
include('db.php');

// Check database connection
if (!$conn) {
    die("Database connection failed: " . mysqli_connect_error());
}

// Ensure the user is logged in
if (!isset($_SESSION['role']) || $_SESSION['role'] != 'user') {
    header('Location: login.php');
    exit();
}

$user_id = $_SESSION['user_id'];

// Get all books from the database
$query = "SELECT * FROM books";
$books_result = $conn->query($query);

if (!$books_result) {
    die("Error in query: " . $conn->error);
}

// Handle adding a book to the readlist
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['add_to_readlist'])) {
    $book_id = intval($_POST['book_id']);

    // Use a prepared statement to prevent SQL injection
    $stmt = $conn->prepare("INSERT INTO readlist (user_id, book_id) VALUES (?, ?)");
    $stmt->bind_param("ii", $user_id, $book_id);

    if ($stmt->execute()) {
        $message = "Book added to your readlist successfully!";
    } else {
        $message = "Failed to add book to readlist. Please try again.";
    }

    $stmt->close();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booklist - ReadRight</title>
    <link rel="stylesheet" href="styles.css">
    <style>
        /* Styling for the table */
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        th, td {
            text-align: left;
            padding: 10px;
            border: 1px solid #ddd;
        }

        th {
            background-color: #f2f2f2;
        }

        tr:nth-child(even) {
            background-color: #f9f9f9;
        }

        img {
            max-width: 100px;
            height: auto;
        }

        .message {
            margin: 10px 0;
            padding: 10px;
            border: 1px solid #ddd;
            background-color: #f9f9f9;
            color: #333;
        }
    </style>
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

        <!-- Display success/error messages -->
        <?php if (isset($message)) { ?>
            <div class="message"><?php echo htmlspecialchars($message); ?></div>
        <?php } ?>

        <table>
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
                            <?php if (!empty($book['thumbnail'])) { ?>
                                <img src="<?php echo htmlspecialchars($book['thumbnail']); ?>" alt="Thumbnail">
                            <?php } else { ?>
                                <img src="default-thumbnail.jpg" alt="Default Thumbnail">
                            <?php } ?>
                        </td>
                        <td><?php echo htmlspecialchars($book['name']); ?></td>
                        <td><?php echo htmlspecialchars($book['genre']); ?></td>
                        <td><?php echo htmlspecialchars($book['writer']); ?></td>
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
