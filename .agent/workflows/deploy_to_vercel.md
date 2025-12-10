---
description: How to deploy the EPS HR Assist application to Vercel
---

# Deploy to Vercel

This project is a standard Vite + React application, which makes it very easy to deploy to Vercel.

## Prerequisites

- A [Vercel account](https://vercel.com/signup).
- The project pushed to a Git repository (GitHub, GitLab, or Bitbucket).

## Steps

1.  **Login to Vercel**: Go to [vercel.com](https://vercel.com) and log in.
2.  **Add New Project**: Click on "Add New..." and select "Project".
3.  **Import Git Repository**: Select the repository where you pushed this project.
4.  **Configure Project**:
    -   **Framework Preset**: Vercel should automatically detect **Vite**. If not, select it manually.
    -   **Root Directory**: `./` (default)
    -   **Build Command**: `npm run build` (or `vite build`)
    -   **Output Directory**: `dist` (default for Vite)
    -   **Install Command**: `npm install`
5.  **Deploy**: Click "Deploy".

Vercel will build your application and provide you with a live URL.

## Troubleshooting

-   **Build Failures**: Check the build logs in Vercel. Ensure all dependencies are in `package.json`.
-   **Routing Issues**: If you experience 404s on refresh, you might need a `vercel.json` configuration for client-side routing, but Vercel usually handles this for Vite apps automatically. If needed, add a `vercel.json` file:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```
