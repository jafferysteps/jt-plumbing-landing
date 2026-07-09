document.addEventListener("DOMContentLoaded", () => {
    
    // Pitch Toggle Control
    const toggleBtn = document.getElementById("toggle-pitch-btn");
    if (toggleBtn) {
        let isPitchView = false;
        // Initialize button text for customer view
        toggleBtn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> Switch to Pitch View';
        
        toggleBtn.addEventListener("click", () => {
            isPitchView = !isPitchView;
            if (isPitchView) {
                document.body.classList.remove("customer-view");
                toggleBtn.innerHTML = '<i class="fa-solid fa-eye"></i> Switch to Customer View';
            } else {
                document.body.classList.add("customer-view");
                toggleBtn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> Switch to Pitch View';
            }
        });
    }

    // Mobile Nav Toggle
    const mobileToggle = document.getElementById("mobile-nav-toggle");
    const desktopNav = document.querySelector(".desktop-nav");

    if (mobileToggle && desktopNav) {
        mobileToggle.addEventListener("click", () => {
            desktopNav.classList.toggle("active");
            // Change icon
            const icon = mobileToggle.querySelector("i");
            if (desktopNav.classList.contains("active")) {
                icon.className = "fa-solid fa-xmark";
            } else {
                icon.className = "fa-solid fa-bars";
            }
        });
        
        desktopNav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                desktopNav.classList.remove("active");
                const icon = mobileToggle.querySelector("i");
                if (icon) icon.className = "fa-solid fa-bars";
            });
        });
    }

    // Dynamic Pricing Estimate Calculator using Select Dropdowns
    const selectFields = document.querySelectorAll(".calc-select-field");
    const calcTotal = document.getElementById("calc-total");
    const calcSelectedList = document.getElementById("calc-selected-list");
    const calcSelectedHidden = document.getElementById("calc-selected-hidden");

    function updateCalculator() {
        let total = 0;
        calcSelectedList.innerHTML = "";
        let selectedCount = 0;
        const selectedNames = [];

        selectFields.forEach(select => {
            const selectedOption = select.options[select.selectedIndex];
            const price = parseFloat(selectedOption.value);
            const name = selectedOption.dataset.name;

            if (price > 0) {
                selectedCount++;
                total += price;
                selectedNames.push(name);

                // Add item to sidebar list
                const li = document.createElement("li");
                li.innerHTML = `<span>${name}</span> <span>$${price}</span>`;
                calcSelectedList.appendChild(li);
            }
        });

        if (selectedCount === 0) {
            const emptyLi = document.createElement("li");
            emptyLi.className = "empty-msg";
            emptyLi.textContent = "No services selected";
            calcSelectedList.appendChild(emptyLi);
        }

        calcTotal.textContent = total;
        if (calcSelectedHidden) {
            calcSelectedHidden.value = selectedNames.join(", ") || "None";
        }
    }

    selectFields.forEach(select => {
        select.addEventListener("change", updateCalculator);
    });

    // Reviews Carousel Rotation
    const reviews = document.querySelectorAll(".review-card");
    const dots = document.querySelectorAll(".dot");
    let currentIndex = 0;

    function showReview(index) {
        if (reviews.length === 0) return;
        reviews.forEach(r => r.classList.remove("active"));
        dots.forEach(d => d.classList.remove("active"));
        if (reviews[index]) reviews[index].classList.add("active");
        if (dots[index]) dots[index].classList.add("active");

        const carousel = document.getElementById("reviews-carousel");
        if (carousel) {
            carousel.style.transform = `translateX(-${index * 100}%)`;
        }
    }

    dots.forEach(dot => {
        dot.addEventListener("click", () => {
            currentIndex = parseInt(dot.dataset.index);
            showReview(currentIndex);
        });
    });
});
