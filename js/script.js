// MySampleHub Landing Page - Main JavaScript

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Countdown for spots left (FOMO mechanism)
function updateSpotsLeft() {
    const spotsElement = document.getElementById('spots-left');
    if (spotsElement) {
        // Simulate decreasing spots (in production, fetch from your backend)
        let spots = parseInt(localStorage.getItem('spotsLeft')) || 247;
        
        // Randomly decrease by 1-3 every 30 seconds to create urgency
        setInterval(() => {
            if (spots > 50) {
                const decrease = Math.floor(Math.random() * 3) + 1;
                spots -= decrease;
                localStorage.setItem('spotsLeft', spots);
                spotsElement.textContent = spots;
            }
        }, 30000);
        
        spotsElement.textContent = spots;
    }
}

// Waitlist count animation
function animateCount(element, start, end, duration) {
    let startTime = null;
    
    function animation(currentTime) {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(animation);
        }
    }
    
    requestAnimationFrame(animation);
}

// Animate waitlist counter when in view
function setupWaitlistCounter() {
    const counterElement = document.getElementById('waitlist-count');
    if (counterElement) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCount(counterElement, 0, 1247, 2000);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counterElement);
    }
}

// Form validation and submission
function setupFormValidation() {
    const form = document.getElementById('waitlist-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const firstName = document.getElementById('firstName').value.trim();
            const email = document.getElementById('email').value.trim();
            const category = document.getElementById('category').value;
            
            // Basic validation
            if (!firstName || !email || !category) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Store data in localStorage (in production, send to your backend)
            const userData = {
                firstName,
                email,
                category,
                timestamp: new Date().toISOString()
            };
            
            localStorage.setItem('mysamplehub_user', JSON.stringify(userData));
            
            // Redirect to thank you page with parameters
            window.location.href = `thank-you.html?name=${encodeURIComponent(firstName)}&email=${encodeURIComponent(email)}`;
        });
    }
}

// Track form interactions for analytics
function trackFormInteractions() {
    const formFields = document.querySelectorAll('#waitlist-form input, #waitlist-form select');
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            // In production, send to analytics
            console.log('Field focused:', this.id);
        });
    });
}

// Initialize all functions when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    updateSpotsLeft();
    setupWaitlistCounter();
    setupFormValidation();
    trackFormInteractions();
    
    // Add floating animation to box preview
    const boxPreview = document.querySelector('.box-placeholder');
    if (boxPreview) {
        setInterval(() => {
            boxPreview.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                boxPreview.style.transform = 'translateY(0)';
            }, 1000);
        }, 3000);
    }
});

// Handle visibility change (tab focus)
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        // User returned to the page - update spots to create urgency
        const spotsElement = document.getElementById('spots-left');
        if (spotsElement) {
            const currentSpots = parseInt(spotsElement.textContent);
            if (currentSpots > 50) {
                const newSpots = currentSpots - Math.floor(Math.random() * 5) - 1;
                spotsElement.textContent = newSpots;
                localStorage.setItem('spotsLeft', newSpots);
            }
        }
    }
});

// Box Preview Modal Functions
function openBoxPreview() {
    const modal = document.getElementById('boxPreviewModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeBoxPreview() {
    const modal = document.getElementById('boxPreviewModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
}

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    const modal = document.getElementById('boxPreviewModal');
    if (event.target === modal) {
        closeBoxPreview();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeBoxPreview();
    }
});

// Make functions globally available
window.openBoxPreview = openBoxPreview;
window.closeBoxPreview = closeBoxPreview;
