/* =========================================================
   BONGX031 BUSINESS ADVERTISING
   PHP + MYSQL VERSION
========================================================= */


/* =========================================================
   1. HTML ELEMENTS
========================================================= */

const advertisementForm =
    document.getElementById("contactForm");

const imageInput =
    document.getElementById("businessImage");

const imagePreview =
    document.getElementById("imagePreview");

const productGrid =
    document.getElementById("productGrid");

const searchInput =
    document.getElementById("searchInput");

const categoryFilter =
    document.getElementById("categoryFilter");

const searchButton =
    document.getElementById("searchButton");


/* =========================================================
   2. IMAGE PREVIEW
========================================================= */

if (imageInput) {

    imageInput.addEventListener("change", function () {

        const file = this.files[0];


        if (!file) {

            if (imagePreview) {

                imagePreview.src = "";

                imagePreview.style.display = "none";

            }

            return;
        }


        /* -----------------------------------------
           CHECK IMAGE TYPE
        ----------------------------------------- */

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif"
        ];


        if (!allowedTypes.includes(file.type)) {

            alert(
                "Please select a JPG, PNG, WEBP or GIF image."
            );

            this.value = "";

            return;
        }


        /* -----------------------------------------
           CHECK IMAGE SIZE
           Maximum = 5 MB
        ----------------------------------------- */

        const maxSize =
            5 * 1024 * 1024;


        if (file.size > maxSize) {

            alert(
                "Image is too large. Maximum size is 5 MB."
            );

            this.value = "";

            return;
        }


        /* -----------------------------------------
           CREATE IMAGE PREVIEW
        ----------------------------------------- */

        const reader =
            new FileReader();


        reader.onload =
            function (event) {

                if (imagePreview) {

                    imagePreview.src =
                        event.target.result;

                    imagePreview.style.display =
                        "block";

                }

            };


        reader.readAsDataURL(file);

    });

}


/* =========================================================
   3. IMPORTANT PHP FORM SUBMISSION
========================================================= */

/*
   DO NOT use event.preventDefault() here.

   The form must be allowed to submit normally to:

       upload.php

   This sends:

   - business information
   - image
   - POST data

   to the PHP server.
*/


if (advertisementForm) {

    advertisementForm.addEventListener(
        "submit",
        function () {

            const submitButton =
                advertisementForm.querySelector(
                    'button[type="submit"]'
                );


            if (submitButton) {

                submitButton.disabled = true;

                submitButton.textContent =
                    "Uploading Advertisement...";

            }

        }
    );

}


/* =========================================================
   4. LOAD ADVERTISEMENTS
========================================================= */

async function loadAdvertisements() {

    if (!productGrid) {

        return;

    }


    productGrid.innerHTML = `

        <div class="loading-message">

            Loading advertisements...

        </div>

    `;


    try {

        /*
           businesses.php should return JSON
           containing advertisements from MySQL.
        */

        const response =
            await fetch("businesses.php");


        if (!response.ok) {

            throw new Error(
                "Could not connect to businesses.php"
            );

        }


        const data =
            await response.json();


        displayAdvertisements(data);


    } catch (error) {

        console.error(
            "Marketplace error:",
            error
        );


        productGrid.innerHTML = `

            <div class="no-products">

                <h3>
                    Advertisements could not be loaded
                </h3>

                <p>
                    Please make sure PHP and MySQL
                    are running.
                </p>

            </div>

        `;

    }

}


/* =========================================================
   5. DISPLAY ADVERTISEMENTS
========================================================= */

function displayAdvertisements(advertisements) {

    if (!productGrid) {

        return;

    }


    productGrid.innerHTML = "";


    if (
        !advertisements ||
        advertisements.length === 0
    ) {

        productGrid.innerHTML = `

            <div class="no-products">

                <h3>
                    No advertisements found
                </h3>

                <p>
                    Be the first business to advertise
                    on BONGX031.
                </p>

            </div>

        `;

        return;

    }


    advertisements.forEach(
        function (business) {


            /* =====================================
               CREATE PRODUCT CARD
            ===================================== */

            const card =
                document.createElement("div");


            card.className =
                "product-card";


            /* =====================================
               WHATSAPP NUMBER
            ===================================== */

            let whatsappNumber =
                String(
                    business.whatsapp || ""
                ).replace(/\D/g, "");


            /*
               Convert:

               0786701301

               to:

               27786701301
            */

            if (
                whatsappNumber.startsWith("0")
            ) {

                whatsappNumber =
                    "27" +
                    whatsappNumber.substring(1);

            }


            /* =====================================
               WHATSAPP MESSAGE
            ===================================== */

            const whatsappMessage =
                encodeURIComponent(
                    "Hello, I am interested in " +
                    (
                        business.product_name ||
                        "your product"
                    ) +
                    " advertised on BONGX031."
                );


            const whatsappURL =
                `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;


            /* =====================================
               IMAGE PATH

               MySQL uses:

               image_path

               NOT image_url
            ===================================== */

            const imagePath =
                business.image_path ||
                "";


            /* =====================================
               PRODUCT CARD
            ===================================== */

            card.innerHTML = `

                <div class="product-image">

                    <img
                        src="${escapeHTML(imagePath)}"
                        alt="${escapeHTML(
                            business.product_name
                        )}"
                        loading="lazy"
                    >


                    <span class="category">

                        ${escapeHTML(
                            business.category
                        )}

                    </span>

                </div>


                <div class="product-info">


                    <h3 class="business-name">

                        ${escapeHTML(
                            business.business_name
                        )}

                    </h3>


                    <h4>

                        ${escapeHTML(
                            business.product_name
                        )}

                    </h4>


                    <p class="description">

                        ${escapeHTML(
                            business.description
                        )}

                    </p>


                    <p class="location">

                        📍
                        ${escapeHTML(
                            business.location
                        )}

                    </p>


                    <div class="product-bottom">


                        <span class="price">

                            R${escapeHTML(
                                business.price
                            )}

                        </span>


                        <a
                            href="${whatsappURL}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="whatsapp-btn"
                        >

                            WhatsApp

                        </a>


                    </div>

                </div>

            `;


            productGrid.appendChild(card);

        }
    );

}


/* =========================================================
   6. SEARCH ADVERTISEMENTS
========================================================= */

function searchAdvertisements() {

    const search =
        searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";


    const selectedCategory =
        categoryFilter
            ? categoryFilter.value.toLowerCase()
            : "all";


    const cards =
        document.querySelectorAll(
            ".product-card"
        );


    cards.forEach(
        function (card) {

            const cardText =
                card.textContent.toLowerCase();


            const categoryElement =
                card.querySelector(
                    ".category"
                );


            const cardCategory =
                categoryElement
                    ? categoryElement.textContent
                        .trim()
                        .toLowerCase()
                    : "";


            const matchesSearch =
                !search ||
                cardText.includes(search);


            const matchesCategory =
                selectedCategory === "all" ||
                cardCategory === selectedCategory;


            if (
                matchesSearch &&
                matchesCategory
            ) {

                card.style.display =
                    "";

            } else {

                card.style.display =
                    "none";

            }

        }
    );

}


/* =========================================================
   7. SEARCH BUTTON
========================================================= */

if (searchButton) {

    searchButton.addEventListener(
        "click",
        searchAdvertisements
    );

}


/* =========================================================
   8. LIVE SEARCH
========================================================= */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        searchAdvertisements
    );

}


/* =========================================================
   9. CATEGORY FILTER
========================================================= */

if (categoryFilter) {

    categoryFilter.addEventListener(
        "change",
        searchAdvertisements
    );

}


/* =========================================================
   10. ESCAPE HTML
========================================================= */

function escapeHTML(text) {

    if (
        text === null ||
        text === undefined
    ) {

        return "";

    }


    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   11. MOBILE MENU
========================================================= */

const menuButton =
    document.getElementById(
        "menuButton"
    );


const navMenu =
    document.getElementById(
        "navMenu"
    );


if (
    menuButton &&
    navMenu
) {

    menuButton.addEventListener(
        "click",
        function () {

            navMenu.classList.toggle(
                "active"
            );

        }
    );

}


/* =========================================================
   12. CLOSE MOBILE MENU
========================================================= */

const navLinks =
    document.querySelectorAll(
        "#navMenu a"
    );


navLinks.forEach(
    function (link) {

        link.addEventListener(
            "click",
            function () {

                if (navMenu) {

                    navMenu.classList.remove(
                        "active"
                    );

                }

            }
        );

    }
);


/* =========================================================
   13. BACK TO TOP
========================================================= */

const topButton =
    document.getElementById(
        "backToTop"
    );


if (topButton) {

    window.addEventListener(
        "scroll",
        function () {

            if (
                window.scrollY > 400
            ) {

                topButton.classList.add(
                    "show"
                );

            } else {

                topButton.classList.remove(
                    "show"
                );

            }

        }
    );


    topButton.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   14. LOAD DATABASE ADVERTISEMENTS
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadAdvertisements();

    }
);
