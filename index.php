<?php
/*
=========================================================
BONGX031 BUSINESS ADVERTISING MARKETPLACE
INDEX.PHP
=========================================================

CONNECTED FILES:
- database.php
- upload.php
- businesses.php
- database.sql
- business.css
- business.js

The advertisement form sends data to upload.php.
The uploaded image is handled by upload.php.
The advertisement information is stored in MySQL.
=========================================================
*/
?>

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <meta
        name="description"
        content="BONGX031 Business Advertising Marketplace - Advertise your business, products and services."
    >

    <title>BONGX031 | Business Advertising Marketplace</title>

    <!-- WEBSITE CSS -->
    <link rel="stylesheet" href="business.css">

    <!-- WEBSITE JAVASCRIPT -->
    <script src="business.js" defer></script>

</head>


<body>


<!-- =====================================================
     HEADER
===================================================== -->

<header class="site-header">

    <div class="logo">
        <a href="index.php">BONGX031</a>
    </div>


    <nav class="main-navigation">

        <a href="#home">Home</a>

        <a href="#marketplace">Marketplace</a>

        <a href="#advertise">Advertise</a>

        <a href="#services">Services</a>

        <a href="#contact">Contact</a>

    </nav>

</header>



<!-- =====================================================
     HOME / HERO SECTION
===================================================== -->

<section id="home" class="hero-section">

    <div class="hero-content">

        <h1>Discover. Advertise. Grow.</h1>

        <p>
            Welcome to BONGX031 — a business advertising marketplace
            where businesses, entrepreneurs and individuals can
            advertise their products and services.
        </p>


        <div class="hero-buttons">

            <a href="#marketplace" class="button">
                Browse Marketplace
            </a>

            <a href="#advertise" class="button secondary-button">
                Advertise Now
            </a>

        </div>

    </div>

</section>



<!-- =====================================================
     MARKETPLACE SEARCH
===================================================== -->

<section id="marketplace" class="marketplace-section">

    <div class="section-heading">

        <h2>BONGX031 Marketplace</h2>

        <p>
            Find products, businesses and services advertised
            on BONGX031.
        </p>

    </div>


    <div class="search-container">

        <input
            type="search"
            id="searchInput"
            placeholder="Search businesses, products or services..."
        >


        <select id="categoryFilter">

            <option value="all">
                All Categories
            </option>

            <option value="fashion">
                Fashion
            </option>

            <option value="electronics">
                Electronics
            </option>

            <option value="food">
                Food
            </option>

            <option value="beauty">
                Beauty
            </option>

            <option value="services">
                Services
            </option>

            <option value="home">
                Home & Furniture
            </option>

            <option value="automotive">
                Automotive
            </option>

            <option value="other">
                Other
            </option>

        </select>


        <button
            type="button"
            id="searchButton"
        >
            Search
        </button>

    </div>


    <!--
    =====================================================
    DYNAMIC MARKETPLACE

    businesses.php will provide advertisements
    stored in the database.
    =====================================================
    -->

    <div
        id="productGrid"
        class="product-grid"
    >

        <div class="loading-message">
            Loading advertisements...
        </div>

    </div>

</section>



<!-- =====================================================
     ADVERTISE SECTION
===================================================== -->

<section id="advertise" class="advertise-section">

    <div class="section-heading">

        <h2>Advertise Your Business</h2>

        <p>
            Add your business, product or service to the
            BONGX031 marketplace.
        </p>

    </div>



    <!-- =================================================
         SUCCESS / ERROR MESSAGE
    ================================================= -->

    <?php if (isset($_GET['upload'])): ?>

        <?php if ($_GET['upload'] === 'success'): ?>

            <div class="success-message">

                <strong>Advertisement submitted successfully!</strong>

                <p>
                    Your advertisement and image have been
                    uploaded and saved.
                </p>

            </div>

        <?php elseif ($_GET['upload'] === 'error'): ?>

            <div class="error-message">

                <strong>Advertisement could not be uploaded.</strong>

                <p>
                    Please check your information and try again.
                </p>

            </div>

        <?php endif; ?>

    <?php endif; ?>



    <!-- =================================================
         ADVERTISEMENT FORM

         IMPORTANT:
         enctype="multipart/form-data"
         is required for image uploads.
    ================================================= -->

    <form
        id="contactForm"
        action="upload.php"
        method="POST"
        enctype="multipart/form-data"
        class="advertisement-form"
    >


        <!-- BUSINESS NAME -->

        <div class="form-group">

            <label for="businessName">
                Business Name
            </label>

            <input
                type="text"
                id="businessName"
                name="business_name"
                placeholder="Enter business name"
                required
            >

        </div>



        <!-- OWNER NAME -->

        <div class="form-group">

            <label for="ownerName">
                Owner / Advertiser Name
            </label>

            <input
                type="text"
                id="ownerName"
                name="owner_name"
                placeholder="Enter your name"
                required
            >

        </div>



        <!-- EMAIL -->

        <div class="form-group">

            <label for="email">
                Email Address
            </label>

            <input
                type="email"
                id="email"
                name="email"
                placeholder="example@email.com"
                required
            >

        </div>



        <!-- WHATSAPP -->

        <div class="form-group">

            <label for="whatsapp">
                WhatsApp / Contact Number
            </label>

            <input
                type="tel"
                id="whatsapp"
                name="whatsapp"
                placeholder="e.g. 0786701301"
                required
            >

        </div>



        <!-- CATEGORY -->

        <div class="form-group">

            <label for="businessCategory">
                Business Category
            </label>

            <select
                id="businessCategory"
                name="category"
                required
            >

                <option value="">
                    Select a category
                </option>

                <option value="Fashion">
                    Fashion
                </option>

                <option value="Electronics">
                    Electronics
                </option>

                <option value="Food">
                    Food
                </option>

                <option value="Beauty">
                    Beauty
                </option>

                <option value="Services">
                    Services
                </option>

                <option value="Home & Furniture">
                    Home & Furniture
                </option>

                <option value="Automotive">
                    Automotive
                </option>

                <option value="Other">
                    Other
                </option>

            </select>

        </div>



        <!-- PRODUCT / SERVICE NAME -->

        <div class="form-group">

            <label for="productName">
                Product / Service Name
            </label>

            <input
                type="text"
                id="productName"
                name="product_name"
                placeholder="What are you advertising?"
                required
            >

        </div>



        <!-- PRICE -->

        <div class="form-group">

            <label for="price">
                Price
            </label>

            <input
                type="text"
                id="price"
                name="price"
                placeholder="e.g. R250"
                required
            >

        </div>



        <!-- LOCATION -->

        <div class="form-group">

            <label for="location">
                Business / Product Location
            </label>

            <input
                type="text"
                id="location"
                name="location"
                placeholder="e.g. Giyani, Limpopo"
                required
            >

        </div>



        <!-- DESCRIPTION -->

        <div class="form-group">

            <label for="description">
                Description
            </label>

            <textarea
                id="description"
                name="description"
                rows="6"
                placeholder="Describe your business, product or service..."
                required
            ></textarea>

        </div>



        <!-- =================================================
             IMAGE UPLOAD
        ================================================= -->

        <div class="form-group image-upload-section">

            <label for="businessImage">
                Business / Product Image
            </label>


            <p class="upload-help">

                Upload a clear picture of the product,
                business or service you are advertising.

            </p>


            <input
                type="file"
                id="businessImage"
                name="business_image"
                accept="image/jpeg,image/png,image/webp,image/gif"
                required
            >


            <!-- IMAGE PREVIEW -->

            <div class="image-preview-container">

                <img
                    id="imagePreview"
                    src=""
                    alt="Selected advertisement image preview"
                    style="display:none;"
                >

            </div>


            <p class="upload-help">

                Accepted formats:
                JPG, JPEG, PNG, WEBP and GIF.
                Maximum size: 5 MB.

            </p>

        </div>



        <!-- =================================================
             SUBMIT BUTTON
        ================================================= -->

        <div class="form-submit">

            <button
                type="submit"
                class="submit-button"
            >
                Upload Advertisement
            </button>

        </div>


    </form>

</section>



<!-- =====================================================
     SERVICES
===================================================== -->

<section id="services" class="services-section">

    <div class="section-heading">

        <h2>Our Services</h2>

        <p>
            BONGX031 helps businesses and entrepreneurs
            reach more customers.
        </p>

    </div>


    <div class="services-grid">


        <div class="service-card">

            <h3>Business Advertising</h3>

            <p>
                Advertise your business and make your
                products or services visible online.
            </p>

        </div>



        <div class="service-card">

            <h3>Product Advertising</h3>

            <p>
                Upload product pictures, descriptions
                and prices for potential customers.
            </p>

        </div>



        <div class="service-card">

            <h3>Local Services</h3>

            <p>
                Promote your services and allow customers
                to find you more easily.
            </p>

        </div>



        <div class="service-card">

            <h3>Digital Marketplace</h3>

            <p>
                Browse advertisements from different
                businesses and categories.
            </p>

        </div>

    </div>

</section>



<!-- =====================================================
     TECHNICIAN SECTION
===================================================== -->

<section class="technician-section">

    <div class="section-heading">

        <h2>Technical Support</h2>

        <p>
            For website or electronic technical assistance,
            contact our technician.
        </p>

    </div>


    <div class="technician-card">

        <h3>Fumpro Zos Electronics</h3>

        <p>
            Technician
        </p>

        <p>

            <strong>
                073 323 4950
            </strong>

        </p>


        <a
            href="https://wa.me/27733234950"
            target="_blank"
            rel="noopener noreferrer"
            class="whatsapp-button"
        >
            Contact Technician on WhatsApp
        </a>

    </div>

</section>



<!-- =====================================================
     CONTACT
===================================================== -->

<section id="contact" class="contact-section">

    <div class="section-heading">

        <h2>Contact BONGX031</h2>

        <p>
            Have a question or need assistance?
            Contact us.
        </p>

    </div>


    <div class="contact-information">

        <p>

            <strong>Email:</strong>

            <a href="mailto:bonganinkhensani@gmail.com">
                bonganinkhensani@gmail.com
            </a>

        </p>


        <p>

            <strong>WhatsApp:</strong>

            <a href="https://wa.me/27786701301"
               target="_blank"
               rel="noopener noreferrer">

                078 670 1301

            </a>

        </p>

    </div>

</section>



<!-- =====================================================
     FOOTER
===================================================== -->

<footer class="site-footer">

    <p>
        &copy; <?php echo date("Y"); ?> BONGX031.
        All rights reserved.
    </p>

    <p>
        Business Advertising Marketplace
    </p>

</footer>



</body>

</html>
