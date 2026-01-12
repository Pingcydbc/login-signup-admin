# 🚀 Deployment Guide - Vercel

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository named `login-signup-admin`
3. **Do NOT** initialize with README, .gitignore, or license

## Step 2: Push Code to GitHub

Run these commands in your terminal:

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/login-signup-admin.git
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username**

## Step 3: Deploy to Vercel

1. Go to https://vercel.com
2. Click "Sign Up" and select "Continue with GitHub"
3. Authorize GitHub access
4. Click "New Project"
5. Select the `login-signup-admin` repository
6. Click "Import"

## Step 4: Configure Environment Variables

In the Vercel dashboard, go to **Settings > Environment Variables** and add:

```
NEXTAUTH_SECRET = (generate using command below)
NEXTAUTH_URL = https://your-project.vercel.app
DATABASE_URL = file:./prisma/dev.db
```

### Generate NEXTAUTH_SECRET:

**On Windows PowerShell:**
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object {Get-Random -Maximum 256}))
```

Or use an online generator: https://generate-secret.vercel.app/32

**Example values:**
```
NEXTAUTH_SECRET=8mK9pL2qR5tV8xW1aB4cD7eF9gH2jK5m
NEXTAUTH_URL=https://login-auth-demo.vercel.app
DATABASE_URL=file:./prisma/dev.db
```

## Step 5: Deploy

1. Click "Deploy"
2. Wait for deployment to complete (1-2 minutes)
3. Once done, you'll get a live URL

## ✅ Testing After Deploy

1. Go to your Vercel URL
2. Try creating an account (Sign Up)
3. Login with the created account
4. Default admin account:
   - **Email:** admin@admin.com
   - **Password:** admin

## ⚠️ Important Notes

### Database Persistence
- Currently using SQLite (data resets on each deploy)
- For production, upgrade to PostgreSQL:
  - Add PostgreSQL via Vercel dashboard
  - Update `DATABASE_URL` with PostgreSQL connection string

### Rebuilding Database
If you need to reset data:
```bash
npx prisma migrate reset
npm run seed
```

## 🎯 Troubleshooting

**"Cannot find module" errors:**
- Make sure all dependencies are installed: `npm install`

**Database errors:**
- Check NEXTAUTH_SECRET is set correctly
- Verify DATABASE_URL format

**Session not working:**
- NEXTAUTH_URL must match your Vercel domain exactly
- Clear browser cache and cookies

---

**Need help?** Check the Next.js and Vercel documentation or contact support.
