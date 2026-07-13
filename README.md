# Week 1 – Meeting Scheduling & Collaboration

## Overview
Implemented the meeting scheduling module for the Nexus platform, enabling entrepreneurs and investors to collaborate through meeting requests and calendar management.

## Features Implemented

- Integrated **FullCalendar** for meeting scheduling.
- Added **availability slot management** (add, edit, delete).
- Enabled entrepreneurs to **send meeting requests** to investors.
- Allowed investors to **accept or decline** meeting requests.
- Automatically added **accepted meetings** to the calendar.
- Displayed **confirmed meetings** on both Entrepreneur and Investor dashboards.
- Updated the **Upcoming Meetings** summary card to display dynamic meeting counts.
- Implemented **localStorage** to persist:
  - Availability slots
  - Meeting requests
  - Confirmed meetings
- Added a success notification after sending a meeting request.
  
# Week 2 – Video Calling & Document Chamber

## Overview
Implemented the Video Calling interface and Document Chamber module for the Nexus platform, enhancing collaboration through virtual meetings and digital document management.

## Features Implemented

### Video Calling
- Built a frontend video call interface.
- Added Start/End Call controls.
- Implemented Video and Audio toggle buttons.
- Added Screen Share UI (mock).

### Document Chamber
- Built the Document Chamber interface.
- Added upload support for PDF, DOC, and DOCX files.
- Implemented document preview and mock E-signature.
- Added document status management (Draft, In Review, Signed).
- Enabled document selection and deletion.
- Used localStorage to persist uploaded documents and document status.

# Week 3 – Payments, Security & Collaboration Enhancements

## Overview
Enhanced the Nexus platform by implementing a mock payment system, strengthening authentication with security features.

### Features Implemented
- Payment System
- Built a Wallet dashboard displaying the current balance.
- Implemented mock Deposit, Withdraw, and Transfer functionality.
- Added a Transaction History section with dynamic transaction records.
- Created a Funding Deal interface for simulated investor funding.
- Used localStorage to persist wallet balance and transaction history.

### Security
- Integrated a Password Strength Meter for secure password validation.
- Implemented a mock OTP (Two-Factor Authentication) verification flow and displayed the demo OTP (123456) in the interface for   testing the deployed application.
- Added Role-Based Access Control (RBAC) for Entrepreneur and Investor dashboards.