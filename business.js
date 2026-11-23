/* =========================================================
   BONGX031 BUSINESS ADVERTISING
   SUPABASE BUSINESS + IMAGE STORAGE SYSTEM
========================================================= */


/* =========================================================
   1. SUPABASE CONFIGURATION
========================================================= */

// Replace these two values with your own Supabase details.

const SUPABASE_URL = "YOUR_SUPABASE_PROJECT_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";


/* =========================================================
   2. CONNECT TO SUPABASE
========================================================= */

const { createClient } = supabase;

const db = createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);


/* =========================================================
   3. HTML ELEMENTS
========================================================= */

const advertisementForm =
    document.getElementById("advertisementForm");

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

const submitButton =
    document.getElementById("submitAdvertisement");


/* =========================================================
   4. IMAGE PREVIEW
========================================================= */

if (imageInput) {

    imageInput.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) {
            return;
        }

        // Check file type
        if (!file.type.startsWith("image/")) {

            alert("Please select a valid image.");

            this.value = "";

            return;
        }


        // Check file size
        // Maximum = 5 MB

        const maxSize = 5 * 1024 * 1024;

        if (file.size > maxSize) {

            alert("Image must be smaller than 5 MB.");

            this.value = "";

            return;
        }


        // Create preview

        const reader = new FileReader();

        reader.onload = function (event) {

            if (imagePreview) {

                imagePreview.src = event.target.result;

                imagePreview.style.display = "block";
            }
        };

        reader.readAsDataURL(file);
    });
}


/* =========================================================
   5. UPLOAD IMAGE TO SUPABASE STORAGE
========================================================= */

async function uploadBusinessImage(file) {

    if (!file) {
        throw new Error("No image selected.");
    }


    /*
       Create a unique filename.

       Example:

       fashion/
       1732456789123-shoes.jpg
    */

    const fileExtension =
        file.name.split(".").pop();

    const uniqueName =
        Date.now() +
        "-" +
        Math.random().toString(36).substring(2) +
        "." +
        fileExtension;


    const category =
        document.getElementById("businessCategory")?.value ||
        "other";


    const filePath =
        category.toLowerCase().replace(/\s+/g, "-") +
        "/" +
        uniqueName;


    /*
       Upload image to Supabase Storage.

       Bucket name:
       business-images
    */

    const { error } = await db
        .storage
        .from("business-images")
        .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false
        });


    if (error) {

        console.error("Image upload error:", error);

        throw new Error(
            "Image could not be uploaded: " +
            error.message
        );
    }


    /*
       Get public URL of uploaded image
    */

    const { data } = db
        .storage
        .from("business-images")
        .getPublicUrl(filePath);


    return data.publicUrl;
}


/* =========================================================
   6. SAVE BUSINESS ADVERTISEMENT
========================================================= */

if (advertisementForm) {

    advertisementForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            /* -----------------------------------------
               GET FORM VALUES
            ----------------------------------------- */

            const businessName =
                document.getElementById("businessName")?.value.trim();

            const category =
                document.getElementById("businessCategory")?.value;

            const productName =
                document.getElementById("productName")?.value.trim();

            const description =
                document.getElementById("description")?.value.trim();

            const price =
                document.getElementById("price")?.value.trim();

            const whatsapp =
                document.getElementById("whatsapp")?.value.trim();

            const location =
                document.getElementById("location")?.value.trim();

            const image =
                document.getElementById("businessImage")?.files[0];


            /* -----------------------------------------
               VALIDATION
            ----------------------------------------- */

            if (!businessName ||
                !category ||
                !productName ||
                !description ||
                !price ||
                !whatsapp ||
                !location ||
                !image) {

                alert(
                    "Please complete all fields and select a business image."
                );

                return;
            }


            /* -----------------------------------------
               CHANGE BUTTON
            ----------------------------------------- */

            if (submitButton) {

                submitButton.disabled = true;

                submitButton.textContent =
                    "Uploading advertisement...";
            }


            try {

                /* -------------------------------------
                   UPLOAD IMAGE
                ------------------------------------- */

                const imageURL =
                    await uploadBusinessImage(image);


                /* -------------------------------------
                   SAVE BUSINESS INFORMATION
                ------------------------------------- */

                const { error } = await db
                    .from("businesses")
                    .insert([
                        {
                            business_name: businessName,

                            category: category,

                            product_name: productName,

                            description: description,

                            price: price,

                            whatsapp: whatsapp,

                            location: location,

                            image_url: imageURL
                        }
                    ]);


                /* -------------------------------------
                   DATABASE ERROR
                ------------------------------------- */

                if (error) {

                    console.error(
                        "Database error:",
                        error
                    );

                    throw new Error(
                        "Advertisement could not be saved: " +
                        error.message
                    );
                }


                /* -------------------------------------
                   SUCCESS
                ------------------------------------- */

                alert(
                    "Advertisement successfully published!"
                );


                /* Clear form */

                advertisementForm.reset();


                /* Hide preview */

                if (imagePreview) {

                    imagePreview.src = "";

                    imagePreview.style.display = "none";
                }


                /* Reload advertisements */

                await loadAdvertisements();


            } catch (error) {

                console.error(error);

                alert(
                    error.message ||
                    "Something went wrong while saving the advertisement."
                );


            } finally {

                if (submitButton) {

                    submitButton.disabled = false;

                    submitButton.textContent =
                        "Publish Advertisement";
                }
            }
        }
    );
}


/* =========================================================
   7. LOAD ADVERTISEMENTS
========================================================= */

async function loadAdvertisements() {

    if (!productGrid) {
        return;
    }


    productGrid.innerHTML = `
        <div class="loading">
            Loading advertisements...
        </div>
    `;


    const { data, error } = await db
        .from("businesses")
        .select("*")
        .order("created_at", {
            ascending: false
        });


    if (error) {

        console.error(
            "Could not load advertisements:",
            error
        );


        productGrid.innerHTML = `
            <div class="no-products">
                <h3>Advertisements could not be loaded</h3>
                <p>Please check your Supabase connection.</p>
            </div>
        `;

        return;
    }


    displayAdvertisements(data);
}


/* =========================================================
   8. DISPLAY ADVERTISEMENTS
========================================================= */

function displayAdvertisements(advertisements) {

    if (!productGrid) {
        return;
    }


    productGrid.innerHTML = "";


    if (!advertisements ||
        advertisements.length === 0) {

        productGrid.innerHTML = `
            <div class="no-products">

                <h3>No advertisements found</h3>

                <p>
                    Be the first business to advertise
                    on BONGX031.
                </p>

            </div>
        `;

        return;
    }


    advertisements.forEach(function (business) {

        const card =
            document.createElement("div");

        card.className = "product-card";


        /*
           Convert WhatsApp number into
           a WhatsApp URL.
        */

        let whatsappNumber =
            business.whatsapp
                .replace(/\D/g, "");


        /*
           South African numbers:

           0786701301

           becomes:

           27786701301
        */

        if (
            whatsappNumber.startsWith("0")
        ) {

            whatsappNumber =
                "27" +
                whatsappNumber.substring(1);
        }


        const whatsappMessage =
            encodeURIComponent(
                "Hello, I am interested in " +
                business.product_name +
                " advertised on BONGX031."
            );


        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;


        /* -----------------------------------------
           CREATE CARD
        ----------------------------------------- */

        card.innerHTML = `

            <div class="product-image">

                <img
                    src="${business.image_url}"
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
                    📍 ${escapeHTML(
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
    });
}


/* =========================================================
   9. SEARCH ADVERTISEMENTS
========================================================= */

async function searchAdvertisements() {

    const search =
        searchInput?.value.trim().toLowerCase() || "";

    const category =
        categoryFilter?.value || "";


    let query =
        db
            .from("businesses")
            .select("*")
            .order("created_at", {
                ascending: false
            });


    /* -----------------------------------------
       CATEGORY FILTER
    ----------------------------------------- */

    if (category) {

        query =
            query.eq(
                "category",
                category
            );
    }


    const { data, error } =
        await query;


    if (error) {

        console.error(
            "Search error:",
            error
        );

        return;
    }


    /* -----------------------------------------
       TEXT SEARCH
    ----------------------------------------- */

    let results = data;


    if (search) {

        results =
            data.filter(function (business) {

                const searchableText = `

                    ${business.business_name}

                    ${business.product_name}

                    ${business.description}

                    ${business.category}

                    ${business.location}

                `.toLowerCase();


                return searchableText.includes(
                    search
                );
            });
    }


    displayAdvertisements(results);
}


/* =========================================================
   10. SEARCH EVENT
========================================================= */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        searchAdvertisements
    );
}


if (categoryFilter) {

    categoryFilter.addEventListener(
        "change",
        searchAdvertisements
    );
}


/* =========================================================
   11. ESCAPE HTML
========================================================= */

function escapeHTML(text) {

    if (text === null ||
        text === undefined) {

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
   12. MOBILE MENU
========================================================= */

const menuButton =
    document.getElementById("menuButton");

const navMenu =
    document.getElementById("navMenu");


if (menuButton && navMenu) {

    menuButton.addEventListener(
        "click",
        function () {

            navMenu.classList.toggle("active");

        }
    );
}


/* =========================================================
   13. CLOSE MOBILE MENU
========================================================= */

const navLinks =
    document.querySelectorAll(
        "#navMenu a"
    );


navLinks.forEach(function (link) {

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
});


/* =========================================================
   14. BACK TO TOP
========================================================= */

const topButton =
    document.getElementById("backToTop");


if (topButton) {

    window.addEventListener(
        "scroll",
        function () {

            if (window.scrollY > 400) {

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
   15. LOAD SAVED BUSINESSES WHEN WEBSITE OPENS
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadAdvertisements();

    }
);
