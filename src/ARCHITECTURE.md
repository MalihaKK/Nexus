## Nexus Platform Architecture

# Overview

Nexus is a React-based collaboration platform that connects entrepreneurs and investors. The application follows a modular architecture that separates reusable UI components, feature modules, pages, shared types, and global state management to ensure scalability, maintainability, and clean code organization.

---

# Project Structure

The project follows a feature-based architecture inside the `src/` directory.

---

# Key Directories

### src/components/

Contains reusable and feature-specific UI components.

- **ui/**: Shared UI components such as Button, Card, Badge, Input, Avatar, and Modal.
- **layout/**: Application layout components including DashboardLayout, Navbar, and Sidebar.
- **chat/**: Chat interface components.
- **collaboration/**: Collaboration-related components.
- **collaboration/calendar/**:
  - AvailabilityCalendar
  - AvailabilityModal
  - MeetingRequestModal
  - MeetingRequests
  - ConfirmedMeetings
- **documentChamber/**:
  - DocumentChamber
  - PDF/document preview
  - E-signature section
  - Contract information panel
  - Document status management

---

### src/pages/

Contains route-level pages organized by feature.

Examples include:

- auth/
- dashboard/
- collaboration/
- deals/
- profile/
- documents/

The **DocumentsPage** provides:

- Document upload
- Document management
- Storage overview
- File deletion
- Document selection
- Integration with the Document Chamber

---

### src/context/

Stores global application state.

- **AuthContext.tsx**
  - User authentication
  - Login state

- **CollaborationContext.tsx**
  - Availability slots
  - Meeting requests
  - Meeting approvals
  - Confirmed meetings
  - Calendar synchronization
  - localStorage persistence

---

### src/data/

Contains mock data used during development.

Examples include:

- Users
- Meetings
- Collaboration data

---

### src/types/

Contains shared TypeScript interfaces used throughout the application.

Examples include:

- AvailabilitySlot
- MeetingRequest
- ConfirmedMeeting
- DocumentItem

These interfaces provide consistent data models for scheduling, collaboration, and document management.

---

# Technology Stack

### Framework

- React 18.3.1
- Vite 5.4.2

### Language

- TypeScript 5.5.3

### Styling

- Tailwind CSS 3.4.1
- PostCSS
- Autoprefixer

### Routing

- React Router DOM 6.22.1

### HTTP Client

- Axios 1.6.7

### State Management

- React Context API
- React Hooks
- AuthContext
- CollaborationContext

### Calendar & Scheduling

- FullCalendar
- @fullcalendar/react
- @fullcalendar/daygrid
- @fullcalendar/interaction

Used for:

- Availability scheduling
- Meeting requests
- Confirmed meetings

### Document Processing

- react-signature-canvas
- FileReader API

Used for:

- Uploading documents
- Previewing PDF files
- Capturing digital signatures

### Utilities

- lucide-react
- date-fns
- react-dropzone
- react-hot-toast

### Browser Storage

- localStorage

Used to persist:

- Availability slots
- Meeting requests
- Confirmed meetings
- Uploaded documents
- Document status

---

# Architecture Highlights

The platform follows a modular and component-driven architecture where:

- Reusable UI components are shared across all modules.
- Feature-specific functionality is isolated into dedicated folders.
- Shared TypeScript interfaces ensure consistent data structures.
- React Context manages global collaboration and authentication state.
- Browser localStorage is used to preserve user data between sessions.
- The document workflow supports uploading, previewing, status tracking, and mock digital signatures.
- The meeting scheduling workflow supports availability management, meeting requests, approvals, and confirmed meetings.