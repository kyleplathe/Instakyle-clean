# Email Setup Instructions

## Quick Setup

You're getting the error "Missing credentials for 'PLAIN'" because the email password is not configured.

### Step 1: Create `.env` file

Create a file named `.env` in the `backend` directory with the following content:

```env
# Email Configuration for Ionos
EMAIL_USER=hello@instakyleiphonerepair.com
EMAIL_PASS=your_ionos_password_here
SMTP_PORT=587
PORT=3001
NODE_ENV=development
```

### Step 2: Get Your Ionos Email Password

1. Log into your Ionos account
2. Go to Email settings
3. Find the password for `hello@instakyleiphonerepair.com`
4. Copy it into the `.env` file

**Important:** Make sure you're using the correct password for the email account. If you have 2FA enabled, you may need to use an app-specific password.

### Step 3: Restart Backend Server

After creating/updating the `.env` file, restart your backend server:

```bash
cd backend
npm run dev
```

### Step 4: Verify Connection

You should see this message when the server starts:
```
✅ SMTP Server is ready to send emails
```

If you see an authentication error, double-check your `EMAIL_PASS` in the `.env` file.

## Troubleshooting

### Error: "Missing credentials for 'PLAIN'"
- **Solution:** Make sure `EMAIL_PASS` is set in your `.env` file

### Error: "EAUTH" (Authentication failed)
- **Solution:** Check that your `EMAIL_USER` and `EMAIL_PASS` are correct
- Try resetting your email password in Ionos

### Error: "Connection timeout"
- **Solution:** Check that port 587 is not blocked by your firewall
- Try port 465 instead (set `SMTP_PORT=465` in `.env`)

## File Location

The `.env` file should be located at:
```
backend/.env
```

**Note:** The `.env` file is in `.gitignore` and will not be committed to git for security.

