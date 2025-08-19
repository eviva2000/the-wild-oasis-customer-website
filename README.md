# 🏕️ The Wild Oasis - Luxurious Cabin Hotel

A modern, full-stack web application for a fictional luxury cabin hotel built with Next.js 15. This customer-facing website allows guests to browse premium cabins, check availability, and manage their reservations with a seamless user experience.

## ✨ Features

- **🏠 Cabin Browsing**: Explore a curated collection of luxury cabins with detailed information and high-quality images
- **📅 Real-time Availability**: Check cabin availability with an interactive date picker
- **🔐 Google Authentication**: Secure sign-in using Google OAuth via NextAuth.js
- **📋 Reservation Management**: Create, view, edit, and cancel bookings with ease
- **📱 Responsive Design**: Fully responsive interface built with Tailwind CSS
- **⚡ Performance Optimized**: Server-side rendering and optimized images for fast loading

## 🚀 Live Demo

The application is deployed on Vercel: [The Wild Oasis Website](https://the-wild-oasis-customer-website-seven.vercel.app)

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (React 18)
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **Authentication**: NextAuth.js with Google OAuth
- **Icons**: Heroicons
- **Date Handling**: date-fns, react-day-picker
- **Deployment**: Vercel

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager
- A Supabase account and project
- Google OAuth credentials

## ⚙️ Environment Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd the-wild-oasis-website
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create a `.env.local` file in the root directory with the following variables:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

AUTH_GOOGLE_ID=your_google_oauth_client_id
AUTH_GOOGLE_SECRET=your_google_oauth_client_secret
```

## 🚀 Getting Started

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build the application for production
- `npm run start` - Start production server
- `npm run prod` - Build and start production server
- `npm run lint` - Run ESLint for code quality

## 📁 Project Structure

```
├── app/
│   ├── _components/     # Reusable React components
│   ├── _lib/           # Utility functions and API calls
│   ├── _styles/        # Global styles
│   ├── about/          # About page
│   ├── account/        # User account pages
│   ├── api/            # API routes
│   ├── cabins/         # Cabin-related pages
│   └── login/          # Authentication pages
├── public/             # Static assets
├── middleware.js       # Next.js middleware
└── ...config files
```

## 🔧 Configuration

### Supabase Setup

1. Create a new Supabase project
2. Set up your database schema for cabins, guests, and bookings
3. Configure Row Level Security (RLS) policies
4. Add your Supabase URL and anon key to environment variables

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs
6. Add your client ID and secret to environment variables




