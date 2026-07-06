## Nexus Platform Architecture

# Overview:

Nexus is a robust React-based collaboration platform designed for entrepreneurs and investors. This document provides an overview of the directory structure and the architectural patterns used in the project to maintain consistency and scalability.


# Project Structure:

The project utilizes a modular architecture within the src/ directory to separate concerns and ensure maintainability.


# Key Directories:

src/components/: Houses the modular components used to build the interface.

ui/: Reusable, atomic UI elements (e.g., Button, Input, Card).

layout/: Structural components that define the app's shell (DashboardLayout, Navbar, Sidebar).

chat/, collaboration/, entrepreneur/, investor/: Feature-specific components.

src/pages/: Contains route-level page components, organized by functional module (e.g., auth/, dashboard/, deals/, profile/).

src/context/: Manages global application state, including user authentication (AuthContext.tsx).

src/data/: Stores static data and mock objects used for development and testing.

src/types/: Centralized location for TypeScript interfaces, ensuring type safety throughout the codebase.


# Technology Stack:

Framework: React 18.3.1 (built with Vite 5.4.2).

Language: TypeScript 5.5.3.

Styling: Tailwind CSS 3.4.1 (with PostCSS and Autoprefixer).

Routing: React Router DOM 6.22.1.

HTTP Client: Axios 1.6.7 (This is important! You are using Axios for API requests).

Utilities:

Icons: lucide-react (for UI icons).

Date Handling: date-fns (perfect for your upcoming Calendar task).

Forms/UI: react-dropzone (for file uploads) and react-hot-toast (for UI notifications).

Deployment: Vercel.