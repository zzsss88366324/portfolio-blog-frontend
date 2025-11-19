# Portfolio & Blog Frontend

A modern React frontend for a portfolio and blog application with Google Material Design styling, featuring full authentication and admin management capabilities.

## Live Demo

**Frontend Application**: https://frontend-8d5n3tmrf-1213s-projects-8e35cd79.vercel.app/

**Backend API**: https://portfolio-blog-api-6bxs.onrender.com

**Test Account**:
- Email: `test@example.com`
- Password: `test123456`

## Features

- **Home Page** - Hero section with feature highlights and call-to-action
- **Projects** - Portfolio showcase with project cards and technology tags
- **Blog** - Blog list and detail pages with comments system
- **Contact** - Contact form for inquiries with backend integration
- **Authentication** - User registration and login with JWT tokens
- **Admin Panel** - Protected admin dashboard for managing projects and blog posts (CRUD operations)
- **Protected Routes** - Automatic redirection to login for unauthorized access
- **Responsive Design** - Mobile-friendly layout with Material Design principles

## Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios
- **Styling**: CSS with Google Material Design
- **State Management**: React Context API
- **Authentication**: JWT Bearer Tokens

## Design

The UI follows Google Material Design principles:
- Clean, modern interface
- Card-based layouts
- Google color palette (Blue, Red, Yellow, Green)
- Subtle shadows and smooth animations
- Responsive grid system
- Professional typography

## Local Development Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running (see backend repository)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/zzsss88366324/portfolio-blog-frontend.git
   cd portfolio-blog-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:9000/api
   ```

   For production deployment:
   ```env
   VITE_API_URL=https://portfolio-blog-api-6bxs.onrender.com/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will open at `http://localhost:5173`

5. **Connect to Backend API**

   Make sure the backend API is running:
   - For local development: Backend should run on `http://localhost:9000`
   - For production: Backend is hosted at `https://portfolio-blog-api-6bxs.onrender.com`

   The frontend will automatically connect to the API URL specified in `.env`

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run linter
npm run lint
```

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.jsx      # Navigation bar with auth-aware links
│   ├── Footer.jsx      # Site footer
│   └── ProtectedRoute.jsx  # Route guard for authentication
├── context/             # React context providers
│   └── AuthContext.jsx # Authentication state management
├── pages/               # Page components
│   ├── Home.jsx        # Landing page
│   ├── Projects.jsx    # Portfolio projects showcase
│   ├── Blog.jsx        # Blog posts list
│   ├── BlogPost.jsx    # Individual blog post with comments
│   ├── Contact.jsx     # Contact form
│   ├── Login.jsx       # User login
│   ├── Register.jsx    # User registration
│   └── Admin.jsx       # Admin dashboard (protected)
├── utils/               # Utilities and API
│   └── api.js          # Axios API client with JWT interceptor
├── App.jsx              # Main app component with routes
├── main.jsx             # Entry point
└── index.css            # Global styles and CSS variables
```

## API Integration

The frontend connects to the backend API for all data operations:

### Public Endpoints
- `GET /api/projects` - Fetch all projects
- `GET /api/blog` - Fetch all blog posts
- `GET /api/blog/:id` - Fetch single blog post with comments
- `POST /api/contact` - Submit contact form
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user

### Protected Endpoints (Requires JWT Token)
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/blog` - Create new blog post
- `PUT /api/blog/:id` - Update blog post
- `DELETE /api/blog/:id` - Delete blog post
- `POST /api/blog/:id/comments` - Add comment to blog post

All protected endpoints automatically include the JWT token in the Authorization header via Axios interceptors.

## Authentication Flow

1. User registers or logs in via `/login` or `/register`
2. Backend returns JWT token
3. Token is stored in localStorage
4. AuthContext provides authentication state globally
5. Protected routes check authentication status
6. Axios interceptor adds token to all API requests
7. Logout clears token and redirects to home

## Deployment

This app is deployed on Vercel with automatic deployments from GitHub.

### Deployment Steps:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

2. **Configure Vercel**
   - Connect your GitHub repository to Vercel
   - Set the root directory to `frontend` (if in monorepo)
   - Add environment variable:
     - `VITE_API_URL`: Your backend API URL

3. **Deploy**
   - Vercel automatically deploys on every push to main
   - Or use CLI: `vercel --prod`

### Environment Variables for Production

In Vercel Dashboard → Settings → Environment Variables:

```
VITE_API_URL=https://portfolio-blog-api-6bxs.onrender.com/api
```

## Backend Repository

The backend API code is available at:
https://github.com/zzsss88366324/portfolio-blog-api

## Features Checklist

- [x] React Router DOM with multiple pages
- [x] Global state management with Context API
- [x] JWT authentication with login/register
- [x] Protected routes with automatic redirection
- [x] Public API integration (projects, blog, contact)
- [x] Protected API integration (admin CRUD operations)
- [x] Responsive design with Material Design
- [x] Form validation and error handling
- [x] Loading states and user feedback
- [x] Comment system for blog posts
- [x] Admin dashboard with full CRUD
- [x] Professional UI/UX design

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

ISC
