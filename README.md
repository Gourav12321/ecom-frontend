# E-Commerce Frontend

A modern, professional React-based e-commerce application built with Vite, Redux Toolkit, and Tailwind CSS.

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Common components (Navbar, SearchBar, etc.)
│   ├── forms/           # Form components
│   ├── layout/          # Layout components (MainLayout, AdminLayout)
│   └── ui/              # Basic UI components
├── pages/               # Page components organized by feature
│   ├── admin/           # Admin dashboard pages
│   ├── auth/            # Authentication pages
│   ├── product/         # Product-related pages
│   └── user/            # User profile and account pages
├── store/               # Redux store configuration
│   ├── slices/          # Redux slices
│   └── index.js         # Store configuration
├── services/            # API service functions
├── config/              # Configuration files
│   ├── api.js           # API configuration
│   ├── firebase.js      # Firebase configuration
│   └── stripe.js        # Stripe configuration
├── constants/           # Application constants
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
├── App.jsx              # Main app component
├── main.jsx             # Application entry point
├── App.css              # Global styles
└── index.css            # Base styles
```

## 🚀 Features

- **User Authentication**: Sign up, sign in, email verification
- **Product Management**: Browse, search, filter products
- **Shopping Cart**: Add/remove items, quantity management
- **Order Processing**: Checkout, payment integration with Stripe
- **Admin Dashboard**: Product management, user management, order tracking
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **State Management**: Redux Toolkit with persistence
- **Real-time Updates**: Firebase integration

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **State Management**: Redux Toolkit + Redux Persist
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Payments**: Stripe
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Package Manager**: npm/yarn

## 📦 Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create environment variables:
   ```bash
   cp .env.example .env
   ```
4. Fill in your environment variables in `.env`
5. Start the development server:
   ```bash
   npm run dev
   ```

## 🔧 Environment Variables

```env
VITE_API_BASE_URL=your_api_base_url
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

## 📱 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🏗️ Architecture

This project follows a feature-based architecture with clear separation of concerns:

- **Components**: Organized by type (common, forms, layout, ui)
- **Pages**: Grouped by feature area (admin, auth, product, user)
- **Store**: Centralized state management with Redux Toolkit
- **Services**: API calls abstracted into service functions
- **Config**: All configuration files in one place

## 🔄 State Management

The application uses Redux Toolkit for state management with the following slices:

- `userSlice`: User authentication and profile data
- `cartSlice`: Shopping cart state and operations

## 🎨 Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Responsive Design**: Mobile-first approach
- **Component-based Styling**: Styles co-located with components

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Developer

**Gourav Maurya**

- Email: mauryagourav82@gmail.com
- Phone: +91 9354291197
- Portfolio: [https://advance-portfolio-web-app.onrender.com/](https://advance-portfolio-web-app.onrender.com/)

---

Built with ❤️ using modern React ecosystem
