<?php

/*
=========================================================
BONGX031 BUSINESS ADVERTISING APP
UPLOAD.PHP
=========================================================

This file:
1. Receives the advertisement form
2. Checks the uploaded image
3. Creates the correct category folder
4. Saves the image
5. Saves the advertisement information in MySQL
=========================================================
*/


/* =====================================================
   CONNECT TO DATABASE
===================================================== */

require_once "database.php";


/* =====================================================
   ONLY ACCEPT POST REQUESTS
===================================================== */

if ($_SERVER["REQUEST_METHOD"] !== "POST") {

    die("Invalid request.");

}


/* =====================================================
   GET FORM DATA
===================================================== */

$business_name = trim($_POST["business_name"] ?? "");
$category      = trim($_POST["category"] ?? "");
$product_name  = trim($_POST["product_name"] ?? "");
$description   = trim($_POST["description"] ?? "");
$price         = trim($_POST["price"] ?? "");
$whatsapp      = trim($_POST["whatsapp"] ?? "");
$location      = trim($_POST["location"] ?? "");


/* =====================================================
   CHECK REQUIRED INFORMATION
===================================================== */

if (
    empty($business_name) ||
    empty($category) ||
    empty($product_name) ||
    empty($description) ||
    empty($price) ||
    empty($whatsapp) ||
    empty($location)
) {

    die("Please complete all required fields.");

}


/* =====================================================
   CHECK IMAGE
===================================================== */

if (
    !isset($_FILES["business_image"]) ||
    $_FILES["business_image"]["error"] !== UPLOAD_ERR_OK
) {

    die("Please select a business image.");

}


$image = $_FILES["business_image"];


/* =====================================================
   CHECK IMAGE SIZE
===================================================== */

/*
   Maximum image size:
   5 MB
*/

$max_size = 5 * 1024 * 1024;


if ($image["size"] > $max_size) {

    die("Image is too large. Maximum size is 5 MB.");

}


/* =====================================================
   CHECK IMAGE TYPE
===================================================== */

$allowed_types = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif"
];


$image_info = getimagesize($image["tmp_name"]);


if ($image_info === false) {

    die("The uploaded file is not a valid image.");

}


$image_type = $image_info["mime"];


if (!in_array($image_type, $allowed_types)) {

    die(
        "Invalid image type. " .
        "Only JPG, PNG, WEBP and GIF images are allowed."
    );

}


/* =====================================================
   ALLOWED CATEGORIES
===================================================== */

$allowed_categories = [
    "Fashion",
    "Electronics",
    "Food",
    "Beauty",
    "Services",
    "Home & Furniture",
    "Automotive",
    "Other"
];


if (!in_array($category, $allowed_categories)) {

    die("Invalid business category.");

}


/* =====================================================
   CREATE CATEGORY FOLDER NAME
===================================================== */

$category_folders = [

    "Fashion"            => "fashion",

    "Electronics"        => "electronics",

    "Food"               => "food",

    "Beauty"             => "beauty",

    "Services"           => "services",

    "Home & Furniture"   => "home-furniture",

    "Automotive"         => "automotive",

    "Other"              => "other"

];


$folder_name =
    $category_folders[$category];


/* =====================================================
   CREATE UPLOAD DIRECTORY
===================================================== */

$upload_directory =
    __DIR__ . "/uploads/" . $folder_name . "/";


if (!is_dir($upload_directory)) {

    if (!mkdir($upload_directory, 0755, true)) {

        die("Could not create image upload folder.");

    }

}


/* =====================================================
   CREATE UNIQUE IMAGE NAME
===================================================== */

$extension = "";


switch ($image_type) {

    case "image/jpeg":
        $extension = "jpg";
        break;

    case "image/png":
        $extension = "png";
        break;

    case "image/webp":
        $extension = "webp";
        break;

    case "image/gif":
        $extension = "gif";
        break;

}


$unique_filename =
    uniqid("bongx031_", true) .
    "." .
    $extension;


/* =====================================================
   COMPLETE IMAGE PATH
===================================================== */

$file_path =
    $upload_directory .
    $unique_filename;


/* =====================================================
   MOVE IMAGE TO UPLOAD FOLDER
===================================================== */

if (!move_uploaded_file(
    $image["tmp_name"],
    $file_path
)) {

    die("The image could not be uploaded.");

}


/* =====================================================
   DATABASE IMAGE PATH
===================================================== */

$image_url =
    "uploads/" .
    $folder_name .
    "/" .
    $unique_filename;


/* =====================================================
   SAVE INFORMATION TO DATABASE
===================================================== */

$sql = "
    INSERT INTO businesses
    (
        business_name,
        category,
        product_name,
        description,
        price,
        whatsapp,
        location,
        image_url
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
";


$stmt = $conn->prepare($sql);


if (!$stmt) {

    /*
       Delete image if database preparation fails.
    */

    unlink($file_path);

    die(
        "Database error: " .
        $conn->error
    );

}


/* =====================================================
   BIND DATA
===================================================== */

$stmt->bind_param(
    "ssssssss",
    $business_name,
    $category,
    $product_name,
    $description,
    $price,
    $whatsapp,
    $location,
    $image_url
);


/* =====================================================
   EXECUTE DATABASE INSERT
===================================================== */

if ($stmt->execute()) {

    /*
       Advertisement successfully saved.
    */

    $stmt->close();
    $conn->close();


    /*
       Redirect back to the main website.
    */

    header(
        "Location: index.php?upload=success"
    );

    exit;

}


/* =====================================================
   IF DATABASE INSERT FAILS
===================================================== */

/*
   Remove uploaded image because
   advertisement was not saved.
*/

unlink($file_path);


$error =
    $stmt->error;


$stmt->close();
$conn->close();


die(
    "Advertisement could not be saved: " .
    $error
);

?>
