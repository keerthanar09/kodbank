# Kodbank - Premium Fintech Banking Application

A production-ready full-stack banking application with glassmorphic UI, JWT authentication, and Supabase PostgreSQL integration.

## Features

- User registration and authentication with JWT
- Secure password hashing with bcrypt
- HTTP-only cookie-based session management
- Automatic database schema initialization
- Balance checking with celebratory animations
- Glassmorphic UI with neon green theme
- Serverless-ready architecture

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- PostgreSQL (Supabase)
- Tailwind CSS
- Framer Motion
- JWT Authentication

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
DATABASE_URL=postgresql://postgres.twlteyiwzyyvwnqtawjl:[YOUR-PASSWORD]@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres
JWT_SECRET=your-secure-jwt-secret-min-32-characters-long
```

Replace `[YOUR-PASSWORD]` with your actual Supabase password.

### 3. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` - the database will initialize automatically on first load.

## Deployment on Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Add environment variables:
   - `DATABASE_URL`: Your Supabase connection string
   - `JWT_SECRET`: A secure random string (min 32 characters)
4. Deploy

### 3. Post-Deployment

Visit your deployed URL - the database schema will be created automatically on first access.

## Database Schema

### KodUser Table
- `uid` (TEXT, PRIMARY KEY)
- `username` (TEXT, UNIQUE, NOT NULL)
- `email` (TEXT, UNIQUE, NOT NULL)
- `password` (TEXT, NOT NULL, hashed)
- `phone` (TEXT, NOT NULL)
- `role` (TEXT, CHECK = 'customer')
- `balance` (NUMERIC, default 0)

### UserToken Table
- `tid` (SERIAL, PRIMARY KEY)
- `token` (TEXT, NOT NULL)
- `uid` (TEXT, FOREIGN KEY → KodUser.uid, ON DELETE CASCADE)
- `expiry` (TIMESTAMP, NOT NULL)

## User Flow

1. **Registration** (`/register`)
   - User provides: uid, username, email, password, phone
   - Role dropdown (only "customer" option available)
   - Animated bank logo and blurred analytical graphs in background
   - Password is hashed before storage
   - Redirects to login on success

2. **Login** (`/login`)
   - User provides: username, password
   - JWT token generated and stored in database
   - Token sent as HTTP-only cookie
   - Balance initialized to ₹1,000,004 on first login
   - Animated bank logo and blurred analytical graphs in background
   - Redirects to dashboard

3. **Dashboard** (`/dashboard`)
   - Full banking interface with sidebar navigation
   - User profile card with status indicator
   - Account overview cards (balance, income, expenses)
   - "Check Balance" button with realistic confetti animation
   - Confetti features: green, yellow, black, white colors + tiny black cats
   - Functioning logout button
   - Fetches balance using JWT authentication

## UI/UX Features

- Custom cursor with green glow effect
- Click ripple animations throughout
- Glassmorphic design with frosted glass effects
- Animated blurred analytical graphs in background
- Animated bank logo with hover effects
- Realistic confetti physics (originates from button, follows trajectory)
- Black + neon green "chat noir" theme
- Smooth micro-interactions and transitions

## Security Features

- Passwords hashed with bcrypt (10 rounds)
- JWT tokens with 7-day expiry
- HTTP-only cookies (prevents XSS)
- Secure flag in production
- Environment-based secrets
- SQL injection protection via parameterized queries

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout (clears auth cookie)
- `GET /api/balance` - Fetch user balance (authenticated)
- `GET /api/init-db` - Initialize database schema
- `POST /api/chat` - AI chatbot endpoint (Hugging Face integration)

## Chatbot Feature

The application includes an AI-powered chatbot named "Kody" that uses Hugging Face's Router API:

- Model: mistralai/Mistral-7B-Instruct-v0.2:together
- Accessible via "Chat with Kody" in the sidebar
- Terminal-style UI with typing animations
- Maintains conversation context
- Reusable API endpoint for external applications
- See `CHATBOT_DOCUMENTATION.md` for detailed technical documentation

## Notes

- Database schema is created automatically on first run
- Balance is initialized to ₹1,000,004 only after successful login
- All secrets must be in environment variables
- Compatible with Vercel serverless functions
- Uses Supabase Session Pooler for IPv4 compatibility
- Custom cursor and animations work across all pages
- Confetti animation uses realistic physics with gravity and rotation
- Dashboard sidebar options are UI-only (no backend functionality yet)
