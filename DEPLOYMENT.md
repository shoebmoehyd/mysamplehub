# Connect mysamplehub.in to GitHub Pages

## Prerequisites
✅ Domain purchased: mysamplehub.in (GoDaddy)
✅ Nameservers: ns35.domaincontrol.com & ns36.domaincontrol.com (Default GoDaddy)
✅ Landing page ready to deploy

## Step 1: Deploy to GitHub Pages

### 1.1 Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `mysamplehub-landing`
3. Description: "MySampleHub - D2C Sampling Marketplace Landing Page"
4. **Public** repository (required for free GitHub Pages)
5. **Don't** initialize with README (we already have one)
6. Click "Create repository"

### 1.2 Push Code to GitHub
```powershell
# Navigate to your landing page directory
cd "C:\Users\shoeb\OneDrive\Desktop\MySampleHub\landing-page"

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - MySampleHub landing page"

# Add GitHub remote (replace YOUR_USERNAME with shoebmoehyd)
git remote add origin https://github.com/shoebmoehyd/mysamplehub-landing.git

# Push to main branch
git push -u origin main
```

### 1.3 Enable GitHub Pages
1. Go to your repo: `https://github.com/shoebmoehyd/mysamplehub-landing`
2. Click **Settings** tab
3. Scroll to **Pages** section (left sidebar)
4. Under "Source":
   - Branch: **main**
   - Folder: **/ (root)**
5. Click **Save**
6. Wait 1-2 minutes - your site will be live at: `https://shoebmoehyd.github.io/mysamplehub-landing/`

## Step 2: Configure DNS in GoDaddy

### 2.1 Access DNS Management
1. Go to https://dnsmanagement.godaddy.com/
2. Find **mysamplehub.in**
3. Click **DNS** button (or "Manage DNS")

### 2.2 Add GitHub Pages A Records
Add these **4 A Records** (one by one):

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 185.199.108.153 | 600 seconds |
| A | @ | 185.199.109.153 | 600 seconds |
| A | @ | 185.199.110.153 | 600 seconds |
| A | @ | 185.199.111.153 | 600 seconds |

**Instructions:**
- Click **Add** button
- Select **A** record type
- Name: `@` (represents root domain)
- Value: Enter each IP address
- TTL: 600 seconds (10 minutes) or Custom
- Click **Save**
- Repeat for all 4 IP addresses

### 2.3 Add CNAME Record for www
| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | www | shoebmoehyd.github.io | 600 seconds |

**Instructions:**
- Click **Add** button
- Select **CNAME** record type
- Name: `www`
- Value: `shoebmoehyd.github.io` (without https://)
- TTL: 600 seconds
- Click **Save**

### 2.4 Remove Conflicting Records (IMPORTANT!)
⚠️ **Delete** any existing A or CNAME records that point to:
- GoDaddy parking page
- Old hosting providers
- Conflicting IP addresses

Keep only:
- The 4 new A records (GitHub IPs)
- The 1 new CNAME record (www subdomain)
- MX records (email) if you have any
- TXT records (verification) if you have any

## Step 3: Configure Custom Domain in GitHub

### 3.1 Add Custom Domain
1. Go back to GitHub repo **Settings** → **Pages**
2. Under "Custom domain":
   - Enter: `mysamplehub.in`
3. Click **Save**
4. GitHub will verify DNS configuration (takes 30 seconds)

### 3.2 Enable HTTPS
1. After DNS verification succeeds (green checkmark ✅)
2. Check the box: **✅ Enforce HTTPS**
3. Wait 10-30 minutes for SSL certificate provisioning

## Step 4: Create CNAME File in Repository

Create a file named `CNAME` (no extension) in your repository root:

```powershell
# In your landing-page directory
echo "mysamplehub.in" > CNAME

# Commit and push
git add CNAME
git commit -m "Add custom domain CNAME"
git push
```

**Alternative:** Create via GitHub web interface:
1. Go to your repo
2. Click **Add file** → **Create new file**
3. Name: `CNAME`
4. Content: `mysamplehub.in`
5. Commit directly to main

## Step 5: Verify Deployment

### 5.1 DNS Propagation Check
Wait 10-30 minutes for DNS propagation, then verify:

```powershell
# Check A records
nslookup mysamplehub.in

# Should show GitHub Pages IPs:
# 185.199.108.153
# 185.199.109.153
# 185.199.110.153
# 185.199.111.153

# Check CNAME record
nslookup www.mysamplehub.in

# Should show: shoebmoehyd.github.io
```

### 5.2 Test Your Site
Visit these URLs:
- ✅ http://mysamplehub.in
- ✅ https://mysamplehub.in
- ✅ http://www.mysamplehub.in
- ✅ https://www.mysamplehub.in

All should redirect to **https://mysamplehub.in** (secure)

### 5.3 Online DNS Check
Use these tools if `nslookup` doesn't work:
- https://dnschecker.org/ (enter: mysamplehub.in)
- https://www.whatsmydns.net/ (check globally)

## Troubleshooting

### DNS Not Resolving
**Problem:** Domain shows GoDaddy parking page or doesn't load

**Solutions:**
1. Wait longer (DNS can take up to 48 hours, usually 10-30 minutes)
2. Clear browser cache: `Ctrl + Shift + Delete`
3. Flush DNS cache:
   ```powershell
   ipconfig /flushdns
   ```
4. Try incognito/private browsing
5. Verify A records are correct in GoDaddy DNS

### "404 - File not found" Error
**Problem:** GitHub Pages shows 404 error

**Solutions:**
1. Check repository is **Public** (not Private)
2. Verify `index.html` exists in root directory
3. Check GitHub Pages settings: Branch = main, Folder = root
4. Wait 2-3 minutes after pushing code

### HTTPS Not Working
**Problem:** "Not Secure" warning or certificate error

**Solutions:**
1. Wait 10-30 minutes for SSL provisioning
2. In GitHub Pages settings, uncheck then re-check "Enforce HTTPS"
3. Clear browser cache and try again
4. Verify DNS is pointing to correct GitHub IPs

### www Subdomain Not Working
**Problem:** www.mysamplehub.in doesn't load

**Solutions:**
1. Verify CNAME record: Name=`www`, Value=`shoebmoehyd.github.io`
2. Wait for DNS propagation
3. Check GoDaddy DNS settings show the CNAME record

## Timeline Expectations

| Step | Time Required |
|------|---------------|
| Create GitHub repo & push code | 5 minutes |
| Enable GitHub Pages | 2 minutes |
| Add DNS records in GoDaddy | 5 minutes |
| DNS propagation | 10-30 minutes (can be up to 48 hours) |
| SSL certificate provisioning | 10-30 minutes |
| **Total estimated time** | **30-60 minutes** |

## Post-Deployment Checklist

- [ ] Repository created and code pushed to GitHub
- [ ] GitHub Pages enabled (main branch, root folder)
- [ ] 4 A records added in GoDaddy DNS
- [ ] 1 CNAME record added for www subdomain
- [ ] Old/conflicting DNS records removed
- [ ] Custom domain added in GitHub Pages settings
- [ ] CNAME file created in repository
- [ ] DNS propagation verified (nslookup or online tools)
- [ ] All URLs working (http/https, with/without www)
- [ ] HTTPS enforced and showing secure padlock 🔒
- [ ] Google Form redirects working correctly
- [ ] Mobile responsiveness tested
- [ ] Interactive box preview modal working

## Next Steps After Deployment

1. **Update Google Form:**
   - Add custom confirmation message with your domain
   - Set up redirect to `https://mysamplehub.in/thank-you.html`

2. **Test All Features:**
   - Join waitlist button
   - Interactive box preview modal
   - Mobile responsive design
   - Form submission flow

3. **Analytics Setup:**
   - Add Google Analytics to track visitors
   - Monitor conversion rates

4. **Start Marketing:**
   - Share on social media
   - Begin brand outreach using your CRM spreadsheet
   - Test with friends/family first

## Support Resources

- GitHub Pages Docs: https://docs.github.com/en/pages
- GoDaddy DNS Help: https://www.godaddy.com/help/manage-dns-680
- GitHub Status: https://www.githubstatus.com/
- DNS Checker: https://dnschecker.org/

---

**Need Help?** If you encounter issues:
1. Check GitHub Pages deployment status in repo Settings → Pages
2. Verify DNS records in GoDaddy DNS management
3. Wait full 30 minutes before troubleshooting
4. Use DNS checker tools to verify propagation globally
