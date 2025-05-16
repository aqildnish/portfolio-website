# Free Deployment Guide

This guide will help you deploy your portfolio website completely free of charge.

## Option 1: Vercel (Recommended)

Vercel is the easiest and most reliable option for hosting Next.js applications.

1. Create a free account at [Vercel](https://vercel.com)
2. Install GitHub Desktop from [https://desktop.github.com/](https://desktop.github.com/)
3. Create a GitHub account if you don't have one
4. Push your code to GitHub using GitHub Desktop
5. Connect your GitHub account to Vercel
6. Import your repository
7. Click "Deploy"

Benefits:
- Automatic HTTPS
- Global CDN
- Automatic deployments on push
- Free custom domain support
- Analytics included

## Option 2: Netlify

Another excellent free option:

1. Create a free account at [Netlify](https://netlify.com)
2. Connect your GitHub repository
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `out`
4. Deploy

Benefits:
- Free SSL certificate
- Global CDN
- Form handling
- Deploy previews

## Custom Domain (Optional)

Free options for custom domains:

1. Freenom - Get free domains with extensions like .tk, .ml, .ga, .cf, .gq
   - Visit [Freenom](https://www.freenom.com)
   - Search for available domains
   - Register for up to 12 months free

2. GitHub Student Developer Pack
   - If you're a student, get a free .me domain for 1 year
   - Visit [GitHub Student Developer Pack](https://education.github.com/pack)

## Tips for Free Hosting

1. Stay within free tier limits:
   - Vercel: 100GB bandwidth/month
   - Netlify: 100GB bandwidth/month

2. Optimize your assets:
   - Compress images using [TinyPNG](https://tinypng.com)
   - Use WebP format for images
   - Minimize JavaScript bundles

3. Use free CDNs for libraries:
   - jsDelivr
   - unpkg
   - CDNJS

## Maintaining Zero Cost

1. Monitor usage in your hosting dashboard
2. Set up email notifications for approaching limits
3. Use lazy loading for images and components
4. Implement caching strategies

Remember: Both Vercel and Netlify provide generous free tiers that are more than sufficient for a personal portfolio website. 