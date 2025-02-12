<?php 
session_start();
if ($_SESSION['role'] != 'user') {
    header('Location: login.php');
    exit();
}

include('db.php');

$user_id = $_SESSION['user_id'];

// Handle deleting a review
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['delete_review'])) {
    $review_id = $_POST['review_id'];
    $conn->query("DELETE FROM reviews WHERE id = $review_id AND user_id = $user_id");
}

// Handle deleting a book from the readlist
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['delete_book'])) {
    $book_id = $_POST['book_id'];
    $conn->query("DELETE FROM readlist WHERE book_id = $book_id AND user_id = $user_id");
}

// Get the user's readlist and associated books
$readlist_result = $conn->query("SELECT books.id, books.name FROM readlist JOIN books ON readlist.book_id = books.id WHERE readlist.user_id = $user_id");

// Handle adding a review
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['add_review'])) {
    $book_id = $_POST['book_id'];
    $review_text = $_POST['review'];
    $rating = $_POST['rating'];

    $conn->query("INSERT INTO reviews (user_id, book_id, review_text, rating) VALUES ($user_id, $book_id, '$review_text', $rating)");
}

// Get the user's reviews and their details
$reviews_result = $conn->query("SELECT reviews.id AS review_id, reviews.review_text, reviews.rating, books.name AS book_name 
                                 FROM reviews 
                                 JOIN books ON reviews.book_id = books.id 
                                 WHERE reviews.user_id = $user_id");

// Get average ratings for books
$ratings_result = $conn->query("SELECT books.name, AVG(reviews.rating) AS avg_rating 
                                FROM reviews 
                                JOIN books ON reviews.book_id = books.id 
                                GROUP BY books.id");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Profile - ReadRight</title>
    <link rel="stylesheet" href="styles.css">
    <style>
        .rating {
            display: flex;
            flex-direction: row-reverse;
            justify-content: flex-start;
        }

        .rating input {
            display: none;
        }

        .rating label {
            font-size: 2rem;
            color: #ddd;
            cursor: pointer;
        }

        .rating input:checked ~ label {
            color: #ffc107;
        }

        .rating label:hover,
        .rating label:hover ~ label {
            color: #ffc107;
        }

        .review-item {
            margin-bottom: 1.5rem;
            padding: 1rem;
            border: 1px solid #ddd;
            border-radius: 5px;
            background-color: transparent;
        }

        button[name="delete_book"] {
            background-color: #ff4d4d;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 3px;
            cursor: pointer;
        }

        button[name="delete_book"]:hover {
            background-color: #ff1a1a;
        }
    </style>
</head>
<body>
    <header>
        <h1>User Profile</h1>
    </header>

    <nav>
        <a href="user_profile.php">Profile</a>
        <a href="booklist.php">Booklist</a>
        <a href="reviews.php">Reviews</a>
        <a href="logout.php">Logout</a>
    </nav>

    <div class="container">
        <h2>Your Readlist</h2>
        <ul>
            <?php while ($book = $readlist_result->fetch_assoc()) { ?>
                <li>
                    <?php echo htmlspecialchars($book['name']); ?>
                    <form method="POST" action="user_profile.php" style="display: inline;">
                        <input type="hidden" name="book_id" value="<?php echo $book['id']; ?>">
                        <button type="submit" name="delete_book" style="margin-left: 10px;">Remove</button>
                    </form>
                </li>
            <?php } ?>
        </ul>

        <h2>Add a Review for a Book in Your Readlist</h2>
        <form method="POST" action="user_profile.php">
            <label for="book_id">Select a Book from Your Readlist:</label>
            <select name="book_id" id="book_id" required>
                <?php
                $readlist_result = $conn->query("SELECT books.id, books.name FROM readlist JOIN books ON readlist.book_id = books.id WHERE readlist.user_id = $user_id");
                while ($book = $readlist_result->fetch_assoc()) { ?>
                    <option value="<?php echo $book['id']; ?>"><?php echo htmlspecialchars($book['name']); ?></option>
                <?php } ?>
            </select>

            <label for="rating">Rate the Book:</label>
            <div class="rating">
                <?php for ($i = 5; $i >= 1; $i--) { ?>
                    <input type="radio" id="star<?php echo $i; ?>" name="rating" value="<?php echo $i; ?>" required>
                    <label for="star<?php echo $i; ?>">&#9733;</label>
                <?php } ?>
            </div>

            <textarea name="review" placeholder="Write your review here..." required></textarea>
            <button type="submit" name="add_review">Submit Review</button>
        </form>

        <h2>Your Reviews</h2>
        <ul>
            <?php while ($review = $reviews_result->fetch_assoc()) { ?>
                <li class="review-item">
                    <p><strong>Book:</strong> <?php echo htmlspecialchars($review['book_name']); ?></p>
                    <p><strong>Review:</strong> <?php echo htmlspecialchars($review['review_text']); ?></p>
                    <p><strong>Rating:</strong> <?php echo str_repeat("&#9733;", $review['rating']) . str_repeat("&#9734;", 5 - $review['rating']); ?></p>
                    <form method="POST" action="user_profile.php" style="margin-top: 1rem;">
                        <input type="hidden" name="review_id" value="<?php echo $review['review_id']; ?>">
                        <button type="submit" name="delete_review">Delete Review</button>
                    </form>
                </li>
            <?php } ?>
        </ul>

        <h2>Average Ratings</h2>
        <ul>
            <?php while ($row = $ratings_result->fetch_assoc()) { ?>
                <li>
                    <?php echo htmlspecialchars($row['name']); ?> - Average Rating: <?php echo round($row['avg_rating'], 2); ?> &#9733;
                </li>
            <?php } ?>
        </ul>
    </div>
</body>
</html>
