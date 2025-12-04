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
    const form = document.getElementById('mysamplehub-form');
    if (form) {
        // Common disposable/temporary email domains to block
        const disposableEmailDomains = [
            'tempmail.com', 'throwaway.email', '10minutemail.com', 'guerrillamail.com',
            'mailinator.com', 'maildrop.cc', 'trashmail.com', 'getnada.com',
            'temp-mail.org', 'fakeinbox.com', 'yopmail.com', 'mohmal.com',
            'sharklasers.com', 'guerrillamail.info', 'grr.la', 'guerrillamail.biz',
            'spam4.me', 'mailnesia.com', 'tmpeml.info', 'emailondeck.com'
        ];
        
        // Valid top-level domains (common ones for India + international)
        const validTLDs = [
            'com', 'in', 'org', 'net', 'edu', 'gov', 'co.in', 'ac.in', 'edu.in',
            'io', 'co', 'me', 'us', 'uk', 'ca', 'au', 'de', 'fr', 'jp',
            'info', 'biz', 'xyz', 'online', 'app', 'dev', 'tech'
        ];
        
        // Known email providers with their correct domains
        const knownEmailProviders = {
            'gmail': 'gmail.com',
            'yahoo': 'yahoo.com',
            'yahoomail': 'yahoo.com',
            'outlook': 'outlook.com',
            'hotmail': 'hotmail.com',
            'live': 'live.com',
            'msn': 'msn.com',
            'icloud': 'icloud.com',
            'me': 'me.com',
            'aol': 'aol.com',
            'protonmail': 'protonmail.com',
            'zoho': 'zoho.com',
            'rediffmail': 'rediffmail.com',
            'yandex': 'yandex.com',
            'mail': 'mail.com'
        };
        
        // Common email typos to suggest corrections
        const commonDomains = {
            'gmail.com': ['gmai.com', 'gmial.com', 'gmail.con', 'gmal.com', 'gmil.com', 'gmail.in', 'gmail.co', 'gmail.net', 'gmail.org'],
            'yahoo.com': ['yaho.com', 'yahooo.com', 'yahoo.con', 'yhoo.com', 'yahoo.in', 'yahoo.net', 'yahoomail.com'],
            'outlook.com': ['outlok.com', 'outloo.com', 'outlook.con', 'outlook.in', 'outlook.net'],
            'hotmail.com': ['hotmial.com', 'hotmai.com', 'hotmail.con', 'hotmail.in', 'hotmail.net'],
            'rediffmail.com': ['rediff.com', 'rediffmai.com', 'rediffmail.in', 'rediffmail.net'],
            'icloud.com': ['iclod.com', 'icloud.con', 'icloud.in', 'icloud.net']
        };
        
        // Email validation with typo detection
        const emailInput = document.getElementById('email');
        const emailSuggestion = document.createElement('span');
        emailSuggestion.className = 'email-suggestion';
        emailSuggestion.style.display = 'none';
        emailInput.parentElement.appendChild(emailSuggestion);
        
        emailInput.addEventListener('blur', function() {
            const email = this.value.trim().toLowerCase();
            if (!email) return;
            
            const domain = email.split('@')[1];
            if (!domain) return;
            
            // Check for typos and suggest corrections
            for (const [correctDomain, typos] of Object.entries(commonDomains)) {
                if (typos.includes(domain)) {
                    const suggestedEmail = email.replace(domain, correctDomain);
                    emailSuggestion.innerHTML = `Did you mean <strong>${suggestedEmail}</strong>? <a href="#" class="use-suggestion">Use this</a>`;
                    emailSuggestion.style.display = 'block';
                    emailSuggestion.style.color = '#E67E22';
                    emailSuggestion.style.fontSize = '13px';
                    emailSuggestion.style.marginTop = '5px';
                    
                    const useLink = emailSuggestion.querySelector('.use-suggestion');
                    useLink.onclick = function(e) {
                        e.preventDefault();
                        emailInput.value = suggestedEmail;
                        emailSuggestion.style.display = 'none';
                    };
                    return;
                }
            }
            
            emailSuggestion.style.display = 'none';
        });
        
        // Handle category checkbox changes to show/hide interest ratings
        const categoryCheckboxes = form.querySelectorAll('input[name="categories"]');
        const interestContainer = document.getElementById('interest-levels-container');
        const interestLevels = document.getElementById('interest-levels');
        
        categoryCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                updateInterestRatings();
            });
        });
        
        function updateInterestRatings() {
            const selectedCategories = Array.from(categoryCheckboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.value);
            
            if (selectedCategories.length > 0) {
                interestContainer.style.display = 'block';
                interestLevels.innerHTML = '';
                
                selectedCategories.forEach((category, index) => {
                    const ratingHtml = `
                        <div class="interest-item">
                            <span class="interest-label">${category}</span>
                            <div class="star-rating" data-category="${category}">
                                <input type="radio" id="star5-${index}" name="interest-${index}" value="5" required>
                                <label for="star5-${index}" title="Extremely Interested">⭐</label>
                                <input type="radio" id="star4-${index}" name="interest-${index}" value="4">
                                <label for="star4-${index}" title="Very Interested">⭐</label>
                                <input type="radio" id="star3-${index}" name="interest-${index}" value="3">
                                <label for="star3-${index}" title="Moderately Interested">⭐</label>
                                <input type="radio" id="star2-${index}" name="interest-${index}" value="2">
                                <label for="star2-${index}" title="Slightly Interested">⭐</label>
                                <input type="radio" id="star1-${index}" name="interest-${index}" value="1">
                                <label for="star1-${index}" title="Not Very Interested">⭐</label>
                            </div>
                        </div>
                    `;
                    interestLevels.insertAdjacentHTML('beforeend', ratingHtml);
                });
                
                // Add click handlers for star ratings after they're created
                setTimeout(() => {
                    document.querySelectorAll('.star-rating').forEach(ratingDiv => {
                        const labels = ratingDiv.querySelectorAll('label');
                        const inputs = ratingDiv.querySelectorAll('input');
                        
                        labels.forEach((label, idx) => {
                            label.addEventListener('click', function() {
                                // Remove active class from all labels in this rating group
                                labels.forEach(l => l.classList.remove('active'));
                                
                                // Add active class to clicked label and all previous ones
                                for (let i = labels.length - 1; i >= idx; i--) {
                                    labels[i].classList.add('active');
                                }
                            });
                            
                            label.addEventListener('mouseenter', function() {
                                // Highlight on hover
                                labels.forEach(l => l.classList.remove('hover'));
                                for (let i = labels.length - 1; i >= idx; i--) {
                                    labels[i].classList.add('hover');
                                }
                            });
                        });
                        
                        ratingDiv.addEventListener('mouseleave', function() {
                            // Remove hover effect when mouse leaves
                            labels.forEach(l => l.classList.remove('hover'));
                        });
                    });
                }, 10);
            } else {
                interestContainer.style.display = 'none';
            }
        }
        
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const firstName = document.getElementById('firstName').value.trim();
            const email = document.getElementById('email').value.trim().toLowerCase();
            const howHeard = document.getElementById('howHeard').value;
            const preferredTime = document.getElementById('preferredTime').value;
            const submitButton = form.querySelector('.submit-button');
            
            // Check localStorage for previous submission (fast client-side check)
            const previousSubmission = localStorage.getItem('mysamplehub_user');
            if (previousSubmission) {
                try {
                    const prevData = JSON.parse(previousSubmission);
                    if (prevData.email === email) {
                        const refCode = btoa(email);
                        const confirmed = confirm(`✅ You're already on the waitlist!\n\nWould you like to view your referral link to share with friends?`);
                        if (confirmed) {
                            window.location.href = `thank-you.html?name=${encodeURIComponent(prevData.firstName || firstName)}&email=${encodeURIComponent(email)}&ref=${refCode}`;
                        }
                        return;
                    }
                } catch (e) {
                    console.log('Could not parse previous submission');
                }
            }
            
            // Enhanced email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                emailInput.focus();
                return;
            }
            
            // Validate TLD (Top-Level Domain)
            const emailParts = email.split('@');
            if (emailParts.length !== 2) {
                alert('Please enter a valid email address.');
                emailInput.focus();
                return;
            }
            
            const domain = emailParts[1];
            const domainParts = domain.split('.');
            const tld = domainParts.slice(-1).join('.');
            const fullTld = domainParts.slice(-2).join('.');
            
            if (!validTLDs.includes(tld) && !validTLDs.includes(fullTld)) {
                alert(`⚠️ Invalid email domain. Please use a valid email address with domains like .com, .in, .org, etc.\n\nExample: yourname@gmail.com`);
                emailInput.focus();
                return;
            }
            
            // Check for disposable email domains
            if (disposableEmailDomains.includes(domain)) {
                alert('⚠️ Temporary/disposable email addresses are not allowed. Please use your personal email address (Gmail, Yahoo, Outlook, etc.)');
                emailInput.focus();
                return;
            }
            
            // Check if it's a known email provider with wrong TLD
            const domainBase = domain.split('.')[0].toLowerCase();
            if (knownEmailProviders[domainBase] && knownEmailProviders[domainBase] !== domain) {
                const correctDomain = knownEmailProviders[domainBase];
                const suggestedEmail = emailParts[0] + '@' + correctDomain;
                const useCorrect = confirm(`⚠️ Did you mean ${suggestedEmail}?\n\n"${domain}" doesn't exist. ${correctDomain} is the correct domain.\n\nClick OK to use ${correctDomain}, or Cancel to edit your email.`);
                if (useCorrect) {
                    emailInput.value = suggestedEmail;
                    return; // Don't submit yet, let user review
                } else {
                    emailInput.focus();
                    return;
                }
            }
            
            // Validate categories
            const selectedCategories = Array.from(categoryCheckboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.value);
            
            const categoriesError = document.getElementById('categories-error');
            
            if (selectedCategories.length === 0) {
                categoriesError.textContent = 'Please select at least one category';
                return;
            } else {
                categoriesError.textContent = '';
            }
            
            // Collect interest ratings
            const interestRatings = {};
            selectedCategories.forEach((category, index) => {
                const rating = form.querySelector(`input[name="interest-${index}"]:checked`);
                if (!rating) {
                    alert(`Please rate your interest level for ${category}`);
                    throw new Error('Missing rating');
                }
                interestRatings[category] = parseInt(rating.value);
            });
            
            // Basic validation
            if (!firstName || !email || !howHeard) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Disable button and show loading
            submitButton.disabled = true;
            submitButton.textContent = '⏳ Checking...';
            
            // Prepare form data
            const formData = {
                firstName,
                email,
                categories: selectedCategories,
                interestRatings,
                howHeard,
                preferredTime: preferredTime || 'No preference',
                timestamp: new Date().toISOString(),
                referrer: new URLSearchParams(window.location.search).get('ref') || 'direct',
                emailVerified: false // Will be verified via welcome email later
            };
            
            try {
                // Submit to Google Sheets via Apps Script
                // IMPORTANT: Replace with your actual Google Apps Script Web App URL
                // See GOOGLE-SHEETS-SETUP.md for instructions
                const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzYi_vSsVNu6apkuh7531CocPLWmLUyixvUqP_CGRWFTIQ8s2wcHQ6LBF-ZGrlF8r5F8w/exec'; 
                
                // Submit to Google Sheets (if URL is configured)
                if (GOOGLE_SCRIPT_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_URL') {
                    submitButton.textContent = '⏳ Submitting...';
                    
                    console.log('=== FORM SUBMISSION DEBUG ===');
                    console.log('Submitting to:', GOOGLE_SCRIPT_URL);
                    console.log('Form data:', formData);
                    console.log('Timestamp:', new Date().toISOString());
                    
                    try {
                        const response = await fetch(GOOGLE_SCRIPT_URL, {
                            method: 'POST',
                            mode: 'no-cors',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(formData)
                        });
                        
                        console.log('✅ Request sent successfully (no-cors mode)');
                        console.log('Note: Data should appear in Google Sheet within 2-3 seconds');
                        console.log('Check your Google Sheet now!');
                        // Note: With no-cors, we cannot read the response
                        // But the data is being submitted to Google Sheets
                    } catch (fetchError) {
                        console.error('❌ Fetch error:', fetchError);
                        console.error('Error details:', fetchError.message);
                        console.error('This error means the request did not reach Google Sheets');
                        // Continue anyway - data is saved in localStorage
                    }
                    
                    console.log('=== END DEBUG ===');
                }
                
                // Save to localStorage as backup and for future duplicate checks
                localStorage.setItem('mysamplehub_user', JSON.stringify(formData));
                
                // Redirect to thank you page with parameters
                const params = new URLSearchParams({
                    name: firstName,
                    email: email,
                    ref: btoa(email) // Create unique referral code from email
                });
                
                window.location.href = `thank-you.html?${params.toString()}`;
                
            } catch (error) {
                console.error('Submission error:', error);
                // Still redirect even if Google Sheets submission fails
                // Data is saved in localStorage as backup
                localStorage.setItem('mysamplehub_user', JSON.stringify(formData));
                
                const params = new URLSearchParams({
                    name: firstName,
                    email: email,
                    ref: btoa(email)
                });
                
                window.location.href = `thank-you.html?${params.toString()}`;
            }
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
