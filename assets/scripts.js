// Function to handle click-outside navbar closure
function initializeNavbarClickOutside() {
    const navbar = document.querySelector('.navbar-collapse');
    const toggleButton = document.querySelector('.navbar-toggler');
    
    if (!navbar || !toggleButton) return;

    // Function to close the navbar
    function closeNavbar() {
        if (navbar.classList.contains('show')) {
            navbar.classList.remove('show');
            toggleButton.setAttribute('aria-expanded', 'false');
        }
    }
    
    // Handle clicks on the document
    document.addEventListener('click', function(event) {
        const isClickInsideNavbar = navbar.contains(event.target);
        const isClickOnToggler = toggleButton.contains(event.target);
        
        // Close the navbar if click is outside navbar and not on toggle button
        if (!isClickInsideNavbar && !isClickOnToggler && navbar.classList.contains('show')) {
            closeNavbar();
        }
    });
    
    // Handle dropdown menus separately
    const dropdownMenus = document.querySelectorAll('.dropdown-menu');
    dropdownMenus.forEach(menu => {
        menu.addEventListener('click', function(event) {
            // Prevent clicks within dropdown from closing the navbar
            event.stopPropagation();
        });
    });
}

// Function to initialize navbar scroll effect and dropdowns
function initializeNavbar() {
    const navbar = document.getElementById('mainNavbar');
    if (navbar) {
        // Initialize dropdown functionality
        const dropdowns = document.querySelectorAll('.dropdown-toggle');
        dropdowns.forEach(dropdown => {
            new bootstrap.Dropdown(dropdown);
        });

        // Initial check of scroll position
        if (window.scrollY > 50) {
            navbar.classList.remove('navbar-clear');
            navbar.classList.add('navbar-dark');
        }

        // Add scroll event listener
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.remove('navbar-clear');
                navbar.classList.add('navbar-dark');
            } else {
                navbar.classList.add('navbar-clear');
                navbar.classList.remove('navbar-dark');
            }
        });

        // Initialize click-outside functionality
        initializeNavbarClickOutside();
    }
}

function tryNavigate(event, link, paths) {
    event.preventDefault();
    
    // Try each path in sequence
    fetch(paths[0])
        .then(response => {
            if (!response.ok) {
                // If first path fails, try the second path
                if (paths.length > 1) {
                    window.location.href = paths[1];
                }
                return;
            }
            // If first path succeeds, use it
            window.location.href = paths[0];
        })
        .catch(() => {
            // If first path fails with an error, try the second path
            if (paths.length > 1) {
                window.location.href = paths[1];
            }
        });
    
    return false;
}

// Initialize intersection observer for gallery items
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            entry.target.classList.remove('animate');
        } else {
            entry.target.classList.add('animate');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '-30px'
});

// Load navbar and initialize all functionality
fetch('navbar.html')
    .then(response => {
        if (!response.ok) {
            // If first fetch fails, try the second path
            return fetch('../navbar.html');
        }
        return response;
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('nav-placeholder').innerHTML = data;
        // Initialize navbar effects and dropdowns after navbar is loaded
        initializeNavbar();
    })
    .catch(error => console.error('Error loading navbar:', error));

// Observe all gallery items after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.gallery-item').forEach((item) => {
        observer.observe(item);
    });
});