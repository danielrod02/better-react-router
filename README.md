# React router template (w/ Better Auth & shadcn)

**You must have docker installer on your system**

The template includes:

- Remix
- Prisma
- Better Auth
- shadcn
- clsx
- Motion
- Tanstack Query
- Zod
- Zustand
- useHooks
- React-i18next
- Postgres (for development running as a **docker container**)

## Installation

```shellscript
pnpx create-react-router@latest --template danielrod02/better-react-router
```
---

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 🔒 Authentication with `better-auth`
- Animations with `Motion`
- State management with `zustand`
- Data fetching with `Tanstack Query`
- Animations with 

[React Router docs](https://reactrouter.com/)

## Getting Started

### Generate project from template

```shellscript
pnpx create-react-router@latest danielrod02/better-react-router
```

### Setup

- Create `.env` file:
```shellscript
BETTER_AUTH_SECRET=<better-auth-secret>
BETTER_AUTH_URL=<base-url> #Base URL of your app
DATABASE_URL=postgres://betterrem:betterpasswd@localhost:32770/betterrem
GOOGLE_CLIENT_ID=<google-client-id>
GOOGLE_CLIENT_SECRET=<google-client-secret>
```
- Run `chmod +x init.sh`
- ***Run the `init.sh` script to finish setting up `better-auth` and `shadcn`***

### Development

Start the development server with HMR:

```bash
pnpm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
pnpm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `pnpm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
