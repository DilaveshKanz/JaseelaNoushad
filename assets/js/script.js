// Element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// Sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// Sidebar toggle functionality for mobile
sidebarBtn?.addEventListener("click", function () { elementToggleFunc(sidebar); });

// Navigation functionality
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Add click event to all nav links
navigationLinks.forEach(link => {
    link.addEventListener("click", function () {
        // Remove active class from all navigation links
        navigationLinks.forEach(item => item.classList.remove("active"));
        
        // Add active class to clicked link
        this.classList.add("active");

        // Get the target page from data-nav-link attribute
        const targetPage = this.getAttribute("data-nav-link");

        // Hide all pages
        pages.forEach(page => page.classList.remove("active"));

        // Show the target page
        const activePage = document.querySelector(`[data-page="${targetPage}"]`);
        activePage.classList.add("active");

        // If this is the portfolio page, make sure all portfolio items are visible initially
        if (targetPage === "portfolio") {
            document.querySelectorAll(".portfolio-item").forEach(item => {
                item.classList.add("active");
            });
        }
    });
});

// Portfolio filtering functionality
const filterItems = document.querySelectorAll("[data-filter-item]");
const filterBtns = document.querySelectorAll("[data-filter-btn]");
const filterSelect = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");

// Filter items when button is clicked
filterBtns.forEach(btn => {
    btn.addEventListener("click", function() {
        let filterValue = this.textContent.toLowerCase();
        selectValue.textContent = this.textContent;
        filterFunc(filterValue);
        
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove("active"));
        // Add active class to clicked button
        this.classList.add("active");
    });
});

// Filter items when select option is chosen
selectItems.forEach(item => {
    item.addEventListener("click", function() {
        let filterValue = this.textContent.toLowerCase();
        selectValue.textContent = this.textContent;
        filterFunc(filterValue);

        // Close select box
        elementToggleFunc(filterSelect);
    });
});

// Filter function
function filterFunc(filterValue) {
    filterItems.forEach(item => {
        if (filterValue === "all" || item.dataset.category === filterValue.toLowerCase()) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });
}

// Add click event to filter select box
filterSelect?.addEventListener("click", function () {
    elementToggleFunc(this);
});

// Initialize: show the about page by default
const defaultPage = document.querySelector('[data-page="about"]');
if (defaultPage) {
    defaultPage.classList.add("active");
    document.querySelector('[data-nav-link="about"]')?.classList.add("active");
}
