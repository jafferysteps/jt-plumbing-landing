const estimatorData = {
    plumbing: [
        { name: "Sewer Line Inspection", min: 150, max: 250 },
        { name: "Water Heater Diagnostic", min: 95, max: 180 },
        { name: "Drain Clearing Service", min: 140, max: 280 },
        { name: "Pipe Leak Repair", min: 180, max: 350 }
    ],
    heating: [
        { name: "Furnace Diagnostics & Checkup", min: 89, max: 160 },
        { name: "Heating System Safety Inspection", min: 110, max: 200 },
        { name: "Thermostat Replacement", min: 120, max: 240 }
    ]
};

document.addEventListener("DOMContentLoaded", () => {
    // Pitch Toggle Control
    const toggleBtn = document.getElementById("toggle-pitch-btn");
    let isPitchView = true;

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

    // Cost Estimator Functionality
    const categoryButtons = document.querySelectorAll(".cat-btn");
    const jobSelector = document.getElementById("job-selector");
    const priceDisplay = document.getElementById("price-range-display");

    function populateJobs(category) {
        jobSelector.innerHTML = "";
        const jobs = estimatorData[category];
        jobs.forEach((job, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.textContent = job.name;
            jobSelector.appendChild(option);
        });
        updatePrice(category, 0);
    }

    function updatePrice(category, index) {
        const job = estimatorData[category][index];
        priceDisplay.textContent = `$${job.min} - $${job.max}`;
    }

    categoryButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            categoryButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            populateJobs(btn.dataset.category);
        });
    });

    jobSelector.addEventListener("change", () => {
        const activeCategory = document.querySelector(".cat-btn.active").dataset.category;
        updatePrice(activeCategory, jobSelector.value);
    });

    // Initial setup
    populateJobs("plumbing");

    // Booking lead form submit
    const leadForm = document.getElementById("estimator-lead-form");
    const leadSuccessMsg = document.getElementById("lead-success-msg");

    leadForm.addEventListener("submit", (e) => {
        e.preventDefault();
        leadForm.style.display = "none";
        leadSuccessMsg.classList.remove("hidden");
    });

    // Carousel rotation
    const reviews = document.querySelectorAll(".review-card");
    const dots = document.querySelectorAll(".dot");
    let currentIndex = 0;

    function showReview(index) {
        reviews.forEach(r => r.classList.remove("active"));
        dots.forEach(d => d.classList.remove("active"));
        reviews[index].classList.add("active");
        dots[index].classList.add("active");

        const carousel = document.getElementById("reviews-carousel");
        carousel.style.transform = `translateX(-${index * 100}%)`;
    }

    dots.forEach(dot => {
        dot.addEventListener("click", () => {
            currentIndex = parseInt(dot.dataset.index);
            showReview(currentIndex);
        });
    });

    setInterval(() => {
        currentIndex = (currentIndex + 1) % reviews.length;
        showReview(currentIndex);
    }, 7000);
});
