// Function to initialize navbar scroll effect
function initializeNavbar() {
    const navbar = document.getElementById('mainNavbar');
    if (navbar) {
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

// Load navbar and initialize scroll effect
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
        // Initialize navbar effects after navbar is loaded
        initializeNavbar();
    })
    .catch(error => console.error('Error loading navbar:', error));


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

// Observe all gallery items
document.querySelectorAll('.gallery-item').forEach((item) => {
    observer.observe(item);
});