## Nexus Platform Architecture

# Overview:

Nexus is a robust React-based collaboration platform designed for entrepreneurs and investors. This document provides an overview of the directory structure and the architectural patterns used in the project to maintain consistency and scalability.


# Project Structure:

The project utilizes a modular architecture within the src/ directory to separate concerns and ensure maintainability.


# Key Directories:

# Key Directories:

src/components/: Houses reusable and feature-specific UI components.

ui/: Reusable, atomic UI elements (e.g., Button, Input, Card, Badge, Avatar).

layout/: Structural components that define the app's shell (DashboardLayout, Navbar, Sidebar).

chat/, collaboration/, entrepreneur/, investor/: Feature-specific components.

collaboration/calendar/: Meeting scheduling components including Availability Calendar, Availability Modal, Meeting Request Modal, Meeting Requests, and Confirmed Meetings.

src/pages/: Contains route-level page components, organized by functional modules (e.g., auth/, dashboard/, deals/, profile/, collaboration/).

src/context/: Manages global application state.

- AuthContext.tsx: Handles user authentication.
- CollaborationContext.tsx: Manages availability slots, meeting requests, confirmed meetings, request actions (send, accept, decline), calendar synchronization, and localStorage persistence.

src/data/: Stores mock users, collaboration data, and sample meeting data used during development.

src/types/: Centralized location for shared TypeScript interfaces.

Week 1 introduced:

- AvailabilitySlot
- MeetingRequest
- ConfirmedMeeting

to support the meeting scheduling and collaboration workflow.


# Technology Stack:

Framework: React 18.3.1 (built with Vite 5.4.2).

Language: TypeScript 5.5.3.

Styling: Tailwind CSS 3.4.1 (with PostCSS and Autoprefixer).

Routing: React Router DOM 6.22.1.

HTTP Client: Axios 1.6.7.

State Management:

- React Context API
- AuthContext
- CollaborationContext

Calendar:

- FullCalendar
- @fullcalendar/react
- @fullcalendar/daygrid
- @fullcalendar/interaction

Utilities:

- Icons: lucide-react
- Date Handling: date-fns
- Forms/UI: react-dropzone
- Notifications: react-hot-toast
- Browser Storage: localStorage (for persisting availability slots, meeting requests, and confirmed meetings)

Deployment: Vercel.