<?php
/*
=========================================================
BONGX031 BUSINESS ADVERTISING APP
DATABASE CONNECTION
=========================================================
*/

/*
    MySQL server
    XAMPP normally uses:
    localhost
*/
$host = "localhost";

/*
    MySQL username
    XAMPP default:
    root
*/
$username = "root";

/*
    XAMPP MySQL default password is usually empty.
    If you created a MySQL password, put it here.
*/
$password = "";

/*
    Database name
*/
$database = "bongx031_business";


/*
=========================================================
CREATE DATABASE CONNECTION
=========================================================
*/

$conn = new mysqli(
    $host,
    $username,
    $password,
    $database
);


/*
=========================================================
CHECK CONNECTION
=========================================================
*/

if ($conn->connect_error) {

    die(
        "Database connection failed: " .
        $conn->connect_error
    );

}


/*
=========================================================
SET CHARACTER ENCODING
=========================================================
*/

$conn->set_charset("utf8mb4");

?>
