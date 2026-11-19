/* =========================================================
   BONGX031 BUSINESS ADVERTISING
   JAVASCRIPT
========================================================= */


/* ================= MOBILE MENU ================= */

const menuButton =
    document.getElementById("menuButton");

const navMenu =
    document.getElementById("navMenu");


menuButton.addEventListener("click", function () {

    navMenu.classList.toggle("active");

});


/* Close menu when a link is clicked */

const navLinks =
    document.querySelectorAll("#navMenu a");


navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navMenu.classList.remove("active");

    });

});



/* ================= PRODUCT SEARCH ================= */

const searchInput =
    document.getElementById("searchInput");

const categoryFilter =
    document.getElementById("categoryFilter");

const searchButton =
    document.getElementById("searchButton");

const productCards =
    document.querySelectorAll(".product-card");

const noProducts =
    document.getElementById("noProducts");



function searchProducts() {

    const searchText =
        searchInput.value
        .toLowerCase()
        .trim();

    const selectedCategory =
        categoryFilter.value;

    let productsFound = 0;


    productCards.forEach(function (product) {

        const productName =
            product.dataset.name.toLowerCase();

        const productCategory =
            product.dataset.category;


        const matchesSearch =
            productName.includes(searchText);


        const matchesCategory =
            selectedCategory === "all"
            ||
            productCategory === selectedCategory;


        if (
            matchesSearch
            &&
            matchesCategory
        ) {

            product.style.display = "block";

            productsFound++;

        } else {

            product.style.display = "none";

        }

    });


    if (productsFound === 0) {

        noProducts.style.display = "block";

    } else {

        noProducts.style.display = "none";

    }

}



/* Search button */

searchButton.addEventListener(
    "click",
    searchProducts
);



/* Search while typing */

searchInput.addEventListener(
    "keyup",
    searchProducts
);



/* Category filter */

categoryFilter.addEventListener(
    "change",
    searchProducts
);



/* ================= CONTACT FORM ================= */

const contactForm =
    document.getElementById("contactForm");


contactForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const name =
            document.getElementById("name").value;

        const business =
            document.getElementById("business").value;


        alert(
            "Thank you, " +
            name +
            ". Your advertising request for " +
            business +
            " has been received."
        );


        contactForm.reset();

    }
);



/* ================= CURRENT YEAR ================= */

document.getElementById("year").textContent =
    new Date().getFullYear();



/* ================= BACK TO TOP ================= */

const topButton =
    document.getElementById("topButton");


window.addEventListener(
    "scroll",
    function () {

        if (window.scrollY > 500) {

            topButton.style.display = "block";

        } else {

            topButton.style.display = "none";

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
