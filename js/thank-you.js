// MySampleHub Thank You Page - JavaScript

// Get user data from URL parameters
function getUserData() {
    const urlParams = new URLSearchParams(window.location.search);
    const firstName = urlParams.get('name') || 'friend';
    const email = urlParams.get('email') || 'your email';
    const refCode = urlParams.get('ref') || generateReferralCode(email);
    
    return { firstName, email, refCode };
}

// Generate unique referral code (from email hash)
function generateReferralCode(email) {
    // Use the same base64 encoding as in the form submission
    return btoa(email).substring(0, 8).replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
}

// Populate user information
function populateUserInfo() {
    const { firstName, email, refCode } = getUserData();
    
    const nameElement = document.getElementById('user-name');
    const emailElement = document.getElementById('user-email');
    
    if (nameElement) {
        nameElement.textContent = firstName;
    }
    
    if (emailElement) {
        emailElement.textContent = email;
    }
    
    // Use the referral code from URL or generated one
    const referralLink = `https://mysamplehub.in?ref=${refCode}`;
    
    const referralInput = document.getElementById('referral-link');
    if (referralInput) {
        referralInput.value = referralLink;
    }
    
    // Setup social sharing links
    setupSocialSharing(referralLink, firstName);
    
    // Store referral info
    localStorage.setItem('mysamplehub_referral', JSON.stringify({
        code: refCode,
        link: referralLink,
        email: email,
        referrals: 0,
        timestamp: new Date().toISOString()
    }));
}

// Copy referral link to clipboard
function copyReferralLink() {
    const referralInput = document.getElementById('referral-link');
    const copyButton = document.querySelector('.copy-button');
    const copyText = document.getElementById('copy-text');
    
    if (referralInput) {
        // Select and copy
        referralInput.select();
        referralInput.setSelectionRange(0, 99999); // For mobile devices
        
        try {
            document.execCommand('copy');
            
            // Visual feedback
            if (copyText) {
                copyText.textContent = 'Copied!';
                copyButton.style.background = '#27AE60';
                
                setTimeout(() => {
                    copyText.textContent = 'Copy';
                    copyButton.style.background = '';
                }, 2000);
            }
            
            // Track copy action
            console.log('Referral link copied');
        } catch (err) {
            console.error('Failed to copy:', err);
            alert('Failed to copy. Please copy manually.');
        }
    }
}

// Setup social sharing buttons
function setupSocialSharing(referralLink, firstName) {
    const shareMessage = `Hey! I just joined MySampleHub to discover amazing D2C brands in India. Join me and get exclusive trial boxes FREE! 🎁`;
    const shareMessageShort = `Join MySampleHub - Get FREE trial boxes from India's best D2C brands! 🎁`;
    
    // WhatsApp
    const whatsappBtn = document.getElementById('whatsapp-share');
    if (whatsappBtn) {
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareMessage + '\n\n' + referralLink)}`;
        whatsappBtn.href = whatsappUrl;
        whatsappBtn.target = '_blank';
        whatsappBtn.addEventListener('click', function() {
            console.log('WhatsApp share clicked');
        });
    }
    
    // Instagram (opens Instagram app to create story - mobile only, desktop opens profile)
    const instagramBtn = document.getElementById('instagram-share');
    if (instagramBtn) {
        // Instagram doesn't have direct share URL, so we copy the link and prompt user
        instagramBtn.href = '#';
        instagramBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Copy referral link to clipboard
            navigator.clipboard.writeText(referralLink).then(() => {
                alert(`📋 Your referral link has been copied!\n\n${referralLink}\n\nNow:\n1. Open Instagram\n2. Create a Story or Post\n3. Paste your link in the caption\n4. Share with your friends! 🎉`);
            }).catch(() => {
                alert(`📱 Share on Instagram:\n\n1. Copy this link: ${referralLink}\n2. Open Instagram\n3. Create a Story or Post\n4. Paste the link in caption`);
            });
            console.log('Instagram share clicked');
        });
    }
    
    // Twitter
    const twitterBtn = document.getElementById('twitter-share');
    if (twitterBtn) {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessageShort)}&url=${encodeURIComponent(referralLink)}`;
        twitterBtn.href = twitterUrl;
        twitterBtn.target = '_blank';
        twitterBtn.addEventListener('click', function() {
            console.log('Twitter share clicked');
        });
    }
    
    // Facebook
    const facebookBtn = document.getElementById('facebook-share');
    if (facebookBtn) {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}&quote=${encodeURIComponent(shareMessage)}`;
        facebookBtn.href = facebookUrl;
        facebookBtn.target = '_blank';
        facebookBtn.addEventListener('click', function() {
            console.log('Facebook share clicked');
        });
    }
    
    // LinkedIn
    const linkedinBtn = document.getElementById('linkedin-share');
    if (linkedinBtn) {
        const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`;
        linkedinBtn.href = linkedinUrl;
        linkedinBtn.target = '_blank';
        linkedinBtn.addEventListener('click', function() {
            console.log('LinkedIn share clicked');
        });
    }
    
    // Email
    const emailBtn = document.getElementById('email-share');
    if (emailBtn) {
        const subject = encodeURIComponent('Join me on MySampleHub!');
        const body = encodeURIComponent(`${shareMessage}\n\n${referralLink}\n\nSee you there!\n${firstName}`);
        emailBtn.href = `mailto:?subject=${subject}&body=${body}`;
        emailBtn.addEventListener('click', function() {
            console.log('Email share clicked');
        });
    }
}

// Animate progress bar (demo)
function animateReferralProgress() {
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    
    // Check localStorage for actual referral count
    const referralData = JSON.parse(localStorage.getItem('mysamplehub_referral') || '{}');
    const referralCount = referralData.referrals || 0;
    
    if (progressFill && progressText) {
        const percentage = (referralCount / 3) * 100;
        progressFill.style.width = `${percentage}%`;
        progressText.innerHTML = `<strong>${referralCount} of 3</strong> friends joined`;
        
        if (referralCount >= 3) {
            progressText.innerHTML += ' 🎉 <strong>Upgrade Unlocked!</strong>';
        }
    }
}

// Check for referral parameter and increment count
function checkReferralParam() {
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get('ref');
    
    if (refCode) {
        // In production, send this to your backend to track referrals
        console.log('User came via referral:', refCode);
        
        // Simulate referral tracking
        const referrerData = localStorage.getItem(`referral_${refCode}`);
        if (referrerData) {
            const data = JSON.parse(referrerData);
            data.count = (data.count || 0) + 1;
            localStorage.setItem(`referral_${refCode}`, JSON.stringify(data));
        }
    }
}

// Add confetti effect on page load (optional enhancement)
function addCelebration() {
    // Simple celebration animation
    const checkmarkCircle = document.querySelector('.checkmark-circle');
    if (checkmarkCircle) {
        setTimeout(() => {
            checkmarkCircle.style.transform = 'scale(1.1)';
            setTimeout(() => {
                checkmarkCircle.style.transform = 'scale(1)';
            }, 300);
        }, 500);
    }
}

// Send welcome email notification (in production, call your backend)
function sendWelcomeEmail() {
    const { firstName, email } = getUserData();
    
    // In production, make API call to your backend
    console.log('Welcome email should be sent to:', email);
    
    // Simulate API call
    const emailData = {
        to: email,
        subject: 'Welcome to MySampleHub! 🎁',
        name: firstName,
        timestamp: new Date().toISOString()
    };
    
    // Store in localStorage for demo
    const sentEmails = JSON.parse(localStorage.getItem('mysamplehub_emails') || '[]');
    sentEmails.push(emailData);
    localStorage.setItem('mysamplehub_emails', JSON.stringify(sentEmails));
}

// Initialize all functions when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    populateUserInfo();
    animateReferralProgress();
    checkReferralParam();
    addCelebration();
    sendWelcomeEmail();
    
    // Make copyReferralLink available globally
    window.copyReferralLink = copyReferralLink;
    
    // Smooth scroll for back link
    const backLink = document.querySelector('.back-link');
    if (backLink) {
        backLink.addEventListener('click', function(e) {
            // Allow default behavior for navigation
        });
    }
});

// Track time spent on thank you page
let startTime = Date.now();
window.addEventListener('beforeunload', function() {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    console.log('Time spent on thank you page:', timeSpent, 'seconds');
    // In production, send to analytics
});
