# Extract Cookies from Your Browser

Since MobileSentrix has CAPTCHA protection, the easiest way is to extract cookies from your regular browser after logging in.

## Method 1: Using Browser DevTools (Easiest)

### Step 1: Login to MobileSentrix
1. Open your regular browser (Chrome/Safari/Firefox)
2. Go to https://www.mobilesentrix.com
3. Login normally (solve the CAPTCHAs)
4. Make sure you're logged in successfully

### Step 2: Extract Cookies
1. Press `F12` (or `Cmd+Option+I` on Mac) to open DevTools
2. Go to the **Console** tab
3. Paste this code and press Enter:

```javascript
copy(JSON.stringify(document.cookie.split(';').map(c => {
  const [name, value] = c.trim().split('=');
  return {
    name,
    value,
    domain: '.mobilesentrix.com',
    path: '/',
    httpOnly: false,
    secure: true,
    sameSite: 'Lax'
  };
}), null, 2))
```

4. The cookies are now copied to your clipboard!

### Step 3: Save to File
1. Open a text editor
2. Paste the cookies (Cmd+V)
3. Save as: `backend/mobilesentrix-cookies.json`

### Step 4: Test
```bash
cd backend
node test-mobilesentrix.js
```

---

## Method 2: Manual Cookie Export

### Chrome:
1. Login to MobileSentrix
2. Click the 🔒 lock icon in address bar
3. Click "Cookies"
4. Find `mobilesentrix.com` cookies
5. Copy each cookie value

### Safari:
1. Login to MobileSentrix  
2. Safari → Preferences → Privacy → Manage Website Data
3. Search for "mobilesentrix"
4. View cookies

---

## Method 3: Use Browser Extension

Install a cookie extension:
- **Chrome**: "EditThisCookie" or "Cookie Editor"
- **Firefox**: "Cookie Quick Manager"

1. Login to MobileSentrix
2. Click extension icon
3. Export cookies as JSON
4. Save to `backend/mobilesentrix-cookies.json`

---

## Expected Cookie Format

Your `mobilesentrix-cookies.json` should look like:

```json
[
  {
    "name": "frontend",
    "value": "abc123...",
    "domain": ".mobilesentrix.com",
    "path": "/",
    "httpOnly": false,
    "secure": true,
    "sameSite": "Lax"
  },
  {
    "name": "PHPSESSID",
    "value": "def456...",
    "domain": ".mobilesentrix.com",
    "path": "/",
    "httpOnly": true,
    "secure": true,
    "sameSite": "Lax"
  }
]
```

---

## Verify It Works

```bash
node test-mobilesentrix.js
```

You should see:
```
✓ Loaded XX cookies
✅ Successfully logged into MobileSentrix
```

---

## Troubleshooting

**"Session expired" error:**
- Extract cookies again from your browser
- Make sure you're still logged in when you extract them

**"No cookies found" error:**
- Check the file path is correct: `backend/mobilesentrix-cookies.json`
- Verify JSON format is valid

---

**Note**: This method bypasses CAPTCHA because you login manually in your regular browser first!


