document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. ACCORDION (Interactive Elements) ---
    // We will apply this to the Enquiry page for FAQs
    const accordions = document.querySelectorAll(".accordion-btn");
    accordions.forEach(acc => {
        acc.addEventListener("click", function() {
            this.classList.toggle("active");
            let panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    });

    // Clicking an image in the shop will open it larger
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const closeBtn = document.querySelector(".close-modal");
    const galleryImages = document.querySelectorAll(".gallery-img");

    if (modal && galleryImages.length > 0) {
        galleryImages.forEach(img => {
            img.style.cursor = "pointer";
            img.addEventListener("click", function() {
                modal.style.display = "block";
                modalImg.src = this.src;
            });
        });

        closeBtn.addEventListener("click", () => modal.style.display = "none");
        modal.addEventListener("click", (e) => {
            if (e.target === modal) modal.style.display = "none";
        });
    }

    // Works on the Shop page
    const searchInput = document.getElementById("productSearch");
    const productCards = document.querySelectorAll(".product-card");

    if (searchInput && productCards.length > 0) {
        searchInput.addEventListener("keyup", function(e) {
            const term = e.target.value.toLowerCase();
            
            productCards.forEach(card => {
                const title = card.querySelector("h3").textContent.toLowerCase();
                if (title.includes(term)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    }

    const forms = document.querySelectorAll(".dynamic-form");
    forms.forEach(form => {
        form.addEventListener("submit", function(e) {
            e.preventDefault(); // Stop page reload
            
            let isValid = true;
            const errorMsg = form.querySelector(".error-message");
            const successMsg = form.querySelector(".success-message");
            
            // Reset messages
            if(errorMsg) errorMsg.style.display = "none";
            if(successMsg) successMsg.style.display = "none";

            // Validate Name
            const nameInput = form.querySelector('input[type="text"]');
            if (nameInput && nameInput.value.trim().length < 2) {
                isValid = false;
                if(errorMsg) {
                    errorMsg.textContent = "Please enter a valid name (at least 2 characters).";
                    errorMsg.style.display = "block";
                }
            }

            const emailInput = form.querySelector('input[type="email"]');
            if (emailInput && !emailInput.value.includes("@")) {
                isValid = false;
                if(errorMsg) {
                    errorMsg.textContent = "Please enter a valid email address.";
                    errorMsg.style.display = "block";
                }
            }

            const phoneInput = form.querySelector('input[type="tel"]');
            if (phoneInput && phoneInput.value.trim() !== "" && phoneInput.value.length < 10) {
                isValid = false;
                if(errorMsg) {
                    errorMsg.textContent = "Please enter a valid phone number (at least 10 digits).";
                    errorMsg.style.display = "block";
                }
            }

            if (isValid) {
                if(successMsg) {
                    successMsg.textContent = "Success! Your message has been sent.";
                    successMsg.style.display = "block";
                    form.reset(); // Clear form
                }
            }
        });
    });
});