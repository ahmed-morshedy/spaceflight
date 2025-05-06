# SpaceFlight News Portal

A Next.js application that displays space-related news, articles, and blogs from the Spaceflight News API.

## Project Overview

This project provides users with the latest space news and articles, including:
- Featured space blogs with modern UI display
- Paginated articles with navigation
- Responsive layout for all device sizes

## Technologies Used

- Next.js 15.3.1
- React 19
- TypeScript
- Tailwind CSS
- Styled Components

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Features

- **News Articles**: Browse through the latest space news articles
- **Blogs**: Access featured blogs from the space community
- **Pagination**: Navigate through multiple pages of content
- **Responsive Design**: Optimized for desktop and mobile devices
- **Dynamic Content**: Real-time data from the Spaceflight News API

## API Integration

This project integrates with the Spaceflight News API v4:
- `/v4/articles` - For space news articles
- `/v4/blogs` - For space-related blogs

## Areas for Improvement

1. **Error Handling**: Improve error messages and recovery strategies
2. **API Optimization**: Reduce redundant API calls and implement caching
3. **Content Filtering**: Add ability to filter articles by category or date
4. **Search Functionality**: Implement search capabilities for finding specific content
5. **Mobile Experience**: Enhance the mobile UI for better small-screen experience

## Deployment

The application can be deployed using your preferred hosting platform that supports Next.js applications.
