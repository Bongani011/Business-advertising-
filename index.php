<form id="contactForm" action="upload.php" method="POST" enctype="multipart/form-data">

    <input
        type="text"
        id="businessName"
        name="business_name"
        placeholder="Business name"
        required
    >

    <input
        type="text"
        id="ownerName"
        name="owner_name"
        placeholder="Your name"
        required
    >

    <input
        type="email"
        id="email"
        name="email"
        placeholder="Email address"
        required
    >

    <input
        type="tel"
        id="phone"
        name="whatsapp"
        placeholder="WhatsApp / phone number"
        required
    >

    <select
        id="businessCategory"
        name="category"
        required
    >
        <option value="">Select business category</option>
        <option value="Fashion">Fashion</option>
        <option value="Electronics">Electronics</option>
        <option value="Food">Food</option>
        <option value="Beauty">Beauty</option>
        <option value="Services">Services</option>
        <option value="Home & Furniture">Home & Furniture</option>
        <option value="Automotive">Automotive</option>
        <option value="Other">Other</option>
    </select>

    <input
        type="text"
        id="productName"
        name="product_name"
        placeholder="Product or service name"
        required
    >

    <input
        type="text"
        id="price"
        name="price"
        placeholder="Price (e.g. R500)"
        required
    >

    <input
        type="text"
        id="location"
        name="location"
        placeholder="Business location"
        required
    >

    <textarea
        id="message"
        name="description"
        rows="5"
        placeholder="Tell us about your business, product or service..."
        required
    ></textarea>

    <label for="businessImage">
        Business / Product Image
    </label>

    <input
        type="file"
        id="businessImage"
        name="business_image"
        accept="image/jpeg,image/png,image/webp,image/gif"
        required
    >

    <img
        id="imagePreview"
        src=""
        alt="Image preview"
        style="display:none; max-width:100%; margin-top:15px;"
    >

    <button
        type="submit"
        id="submitAdvertisement"
        class="btn primary"
    >
        Publish Advertisement
    </button>

</form>
