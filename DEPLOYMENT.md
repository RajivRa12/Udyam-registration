# Deployment Guide - Netlify

This guide will help you deploy the Udyam Registration Website to Netlify.

## 🚀 Quick Deploy

### Option 1: Deploy from GitHub (Recommended)

1. **Fork or Clone the Repository**
   - Go to [https://github.com/RajivRa12/Udyam-registration](https://github.com/RajivRa12/Udyam-registration)
   - Click "Fork" to create your own copy, or clone it to your local machine

2. **Connect to Netlify**
   - Sign up/Login to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Choose "GitHub" as your Git provider
   - Select the `Udyam-registration` repository

3. **Configure Build Settings**
   - **Build command**: `npm run build`
   - **Publish directory**: `dist/spa`
   - **Node version**: `18` (or higher)

4. **Deploy**
   - Click "Deploy site"
   - Wait for the build to complete
   - Your site will be live at a Netlify subdomain

### Option 2: Manual Deploy

1. **Build the Project Locally**
   ```bash
   git clone https://github.com/RajivRa12/Udyam-registration.git
   cd Udyam-registration
   npm install
   npm run build
   ```

2. **Upload to Netlify**
   - Go to Netlify dashboard
   - Drag and drop the `dist/spa` folder
   - Your site will be deployed instantly

## ⚙️ Environment Variables

If you need to configure environment variables:

1. Go to your site's dashboard on Netlify
2. Navigate to **Site settings** → **Environment variables**
3. Add any required variables:
   ```
   NODE_ENV=production
   ```

## 🔧 Custom Domain

To use a custom domain:

1. Go to **Domain management** in your site settings
2. Click **Add custom domain**
3. Follow the DNS configuration instructions
4. Wait for DNS propagation (can take up to 48 hours)

## 📱 Function Configuration

The project includes Netlify functions for serverless backend:

- **Location**: `netlify/functions/`
- **Entry point**: `netlify/functions/api.ts`
- **Automatic deployment**: Functions are automatically deployed with your site

## 🚨 Troubleshooting

### Build Failures

- **Node version**: Ensure you're using Node.js 18+
- **Dependencies**: Check that all dependencies are properly installed
- **Build logs**: Review the build logs in Netlify for specific errors

### Runtime Issues

- **Function errors**: Check Netlify function logs
- **API endpoints**: Verify function URLs are correct
- **CORS issues**: Ensure proper CORS configuration

### Performance

- **Image optimization**: Use WebP format for images
- **Code splitting**: The build process automatically optimizes bundle size
- **CDN**: Netlify provides global CDN by default

## 📊 Monitoring

- **Analytics**: Enable Netlify Analytics in site settings
- **Forms**: Netlify automatically handles form submissions
- **Logs**: Access function logs and build logs from the dashboard

## 🔄 Continuous Deployment

Once connected to GitHub:

- **Automatic**: Every push to main branch triggers a new deployment
- **Preview**: Pull requests get preview deployments
- **Rollback**: Easy rollback to previous versions from the dashboard

## 📞 Support

If you encounter deployment issues:

1. Check the [Netlify documentation](https://docs.netlify.com)
2. Review build logs for specific error messages
3. Check the [GitHub repository issues](https://github.com/RajivRa12/Udyam-registration/issues)

---

**Happy Deploying! 🎉**
