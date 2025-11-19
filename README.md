# Portfolio & Blog Frontend

A modern React frontend for a portfolio and blog application with Google Material Design styling.

## Features

- **Home Page** - Hero section with feature highlights
- **Projects** - Portfolio showcase with project cards
- **Blog** - Blog list and detail pages with comments
- **Contact** - Contact form for inquiries
- **Authentication** - User registration and login
- **Responsive Design** - Mobile-friendly layout

## Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Styling**: CSS with Google Material Design

## Design

The UI follows Google Material Design principles:
- Clean, modern interface
- Card-based layouts
- Google color palette
- Subtle shadows and animations
- Responsive grid system

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:9000/api
```

For production (Vercel):
```env
VITE_API_URL=https://your-render-backend.onrender.com/api
```

## Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/       # Reusable components
│   ├── Navbar.jsx
│   └── Footer.jsx
├── context/          # React context providers
│   └── AuthContext.jsx
├── pages/            # Page components
│   ├── Home.jsx
│   ├── Projects.jsx
│   ├── Blog.jsx
│   ├── BlogPost.jsx
│   ├── Contact.jsx
│   ├── Login.jsx
│   └── Register.jsx
├── utils/            # Utilities and API
│   └── api.js
├── App.jsx           # Main app component
├── main.jsx          # Entry point
└── index.css         # Global styles
```

## Deployment

This app is configured for deployment on Vercel.

### Steps:
1. Connect your GitHub repository to Vercel
2. Set the root directory to `frontend`
3. Add environment variable `VITE_API_URL`
4. Deploy

## License

ISC
