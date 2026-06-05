# 📧 EmailJS Setup Guide

## Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email

## Step 2: Add Email Service
1. Go to **Email Services** in your EmailJS dashboard
2. Click **Add New Service**
3. Choose **Gmail** (recommended) or your preferred email provider
4. Connect your email account (the one that will send emails)
5. Note down the **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template
1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template content:

```
Subject: New Contact Form Submission - NextLayer Studio

From: {{user_name}} ({{user_email}})

Message:
{{message}}

---
Sent from NextLayer Studio website contact form
```

4. Note down the **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Public Key
1. Go to **Account** → **General**
2. Copy your **Public Key** (e.g., `abc123xyz`)

## Step 5: Update Your Code
Open `src/components/ContactForm.tsx` and replace:

```typescript
const result = await emailjs.sendForm(
  'YOUR_SERVICE_ID',     // Replace with your Service ID
  'YOUR_TEMPLATE_ID',    // Replace with your Template ID  
  form.current,
  'YOUR_PUBLIC_KEY'      // Replace with your Public Key
);
```

## Step 6: Configure Email Destination
In your EmailJS template settings:
- Set **To Email**: `team@nextlayer.studio`
- This ensures all form submissions go to your email

## Step 7: Test
1. Fill out the contact form on your website
2. Submit it
3. Check `team@nextlayer.studio` for the email

## 🎉 Done!
Your contact form will now automatically send emails to `team@nextlayer.studio` when users submit it.

## Free Tier Limits
- 200 emails per month
- No credit card required
- Perfect for most small businesses

## Troubleshooting
- Check browser console for error messages
- Verify all IDs are correct in ContactForm.tsx
- Make sure your EmailJS service is connected properly 