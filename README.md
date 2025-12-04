# MySampleHub Landing Page

🌐 **Live at:** [mysamplehub.in](https://mysamplehub.in)

A professional waitlist landing page for MySampleHub - India's premier product sampling marketplace.

## 🎯 About MySampleHub

MySampleHub is a two-sided marketplace connecting emerging brands with consumers through curated product sampling:

- **For Brands**: Lower Customer Acquisition Cost (CAC) with targeted sampling and attributable ROI data
- **For Users**: Discover free trial boxes across Beauty, Snacks, Fragrances, and Supplements with exclusive discounts

## ✨ Features

✅ **Responsive Design** - Mobile-first, works on all devices  
✅ **Interactive Box Preview** - Modal showcase of sample products  
✅ **FOMO Mechanism** - Live countdown of available spots  
✅ **Viral Referral Loop** - Social sharing with unique referral links  
✅ **Google Forms Integration** - Zero-cost waitlist collection  
✅ **Smooth Animations** - Professional UI/UX with CSS transitions  
✅ **SEO Optimized** - Semantic HTML structure

## 📁 Project Structure

```
landing-page/
├── index.html          # Main waitlist landing page
├── thank-you.html      # Post-signup referral page  
├── CNAME              # Custom domain configuration
├── css/
│   └── styles.css      # Complete styling with brand colors
├── js/
│   ├── script.js       # Main page interactions & modal
│   └── thank-you.js    # Referral logic and tracking
├── assets/
│   └── logo.png        # MySampleHub brand logo
├── README.md           # Project overview (this file)
└── DEPLOYMENT.md       # Detailed deployment instructions
```

## 🎨 Brand Identity

**Colors:**
- Primary Purple: `#9B59B6`
- Pink Accent: `#F8E0F7`  
- Dark Purple: `#7D3C98`

**Font:** Inter (Google Fonts)

## 🚀 Quick Start

**For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)**

### Local Development

```powershell
# Navigate to project directory
cd "C:\Users\shoeb\OneDrive\Desktop\MySampleHub\landing-page"

# Start local server
python -m http.server 8000

# Open browser to: http://localhost:8000
```

### Deploy to Production

**See [DEPLOYMENT.md](DEPLOYMENT.md) for complete instructions:**
- GitHub Pages setup (FREE hosting)
- Custom domain configuration with GoDaddy
- DNS records setup
- HTTPS configuration
- Troubleshooting guide

### Quick Deploy

```powershell
# Initialize git
cd "C:\Users\shoeb\OneDrive\Desktop\MySampleHub\landing-page"
git init
git add .
git commit -m "Initial commit - MySampleHub landing page"

# Push to GitHub (create repo first at github.com/new)
git remote add origin https://github.com/shoebmoehyd/mysamplehub-landing.git
git push -u origin main

# Enable GitHub Pages in repo Settings → Pages
# Add custom domain: mysamplehub.in
```

## 🔧 Configuration

### Google Forms Integration

Current form: [https://forms.gle/eUpGTC5LmcuZTHMp7](https://forms.gle/eUpGTC5LmcuZTHMp7)  
Responses are collected in a private Google Sheets (admin access only).

Form opens in new tab when users click "Join Waitlist" buttons.

### Interactive Box Preview Modal

Click "Preview Your Box" to see the interactive modal with:
- 4 sample products (Beauty, Snacks, Fragrances, Wellness)
- Exclusive perks (discount codes, feedback survey, bonus item)
- Close by clicking X, outside modal, or pressing Escape

### FOMO Counter

The "X spots left" counter decreases automatically to create urgency:

```javascript
// In js/script.js - Change initial spots value
let spots = parseInt(localStorage.getItem('spotsLeft')) || 247;
```

## 📊 Analytics Setup

Add Google Analytics before `</head>` in `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 🧪 Pre-Launch Checklist

- [ ] Test interactive box preview modal
- [ ] Verify Google Form link works  
- [ ] Test referral link generation on thank-you page
- [ ] Check mobile responsiveness (iPhone, Android)
- [ ] Test all "Join Waitlist" buttons
- [ ] Verify logo displays correctly
- [ ] Test with different browsers (Chrome, Safari, Firefox)
- [ ] Check HTTPS certificate (green padlock)
- [ ] Verify all 4 product categories display
- [ ] Test social sharing buttons

## 🚀 Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Hosting:** GitHub Pages (FREE)
- **Domain:** GoDaddy (mysamplehub.in)
- **Forms:** Google Forms (FREE)
- **SSL:** Let's Encrypt via GitHub (FREE)
- **Font:** Inter from Google Fonts

## 📈 Marketing Integration

### Email Collection
- **Current:** Google Forms → Google Sheets
- **Future:** Mailchimp/SendGrid API integration

### Social Proof
- 0 Members Joining (grows as users sign up)
- 15+ Aimed Partner Brands (manual update)
- 4 Product Categories (fixed)

### Viral Loop
1. User signs up → Gets unique referral link
2. Shares link → Track referrals via URL parameters
3. Friends join → Original user gets rewards (future feature)

## 🔒 Security & Privacy

- No passwords stored (waitlist only)
- Google Forms handles data collection securely
- HTTPS enforced for all traffic
- No cookies or tracking without consent

## 🛠️ Troubleshooting

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed troubleshooting including:
- DNS not resolving
- 404 errors
- HTTPS certificate issues
- www subdomain problems

## 📞 Next Steps After Launch

1. **Monitor Signups:** Check Google Sheets responses
2. **Share Widely:** LinkedIn, Twitter, WhatsApp groups
3. **Brand Outreach:** Use CRM spreadsheet for emerging brands
4. **Gather Feedback:** Ask first 50 users for input
5. **Iterate:** A/B test headlines and CTAs

## 📄 License

© 2025 MySampleHub - All Rights Reserved

---

**Questions?** Check [DEPLOYMENT.md](DEPLOYMENT.md) or open an issue on GitHub.
