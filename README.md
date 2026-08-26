# 🧘 YogaPT

> A modern, immersive yoga platform designed to connect students with personalized yoga sessions while giving trainers a complete system to manage classes, sessions, and bookings.

YogaPT is a full-stack yoga platform built around a calm, immersive user experience and a practical session-booking system.

The platform allows users to explore yoga practices, view available classes and sessions, select dates and time slots, and submit booking requests through an interactive booking flow.

The project is being developed as a complete full-stack application with a public-facing website, backend API, database integration, and an upcoming administrative management system.

---

## ✨ Features

### 🌿 Public Website

- Modern yoga-focused landing page
- Responsive design for desktop, tablet, and mobile
- Light and dark theme support
- Animated theme transition
- Custom cursor interactions
- Smooth transitions and micro-interactions
- Hero section with booking CTA
- About trainer section
- Achievements and certifications
- Yoga practice/class showcase
- Journey section
- Yoga philosophy section
- Testimonials
- Gallery
- Contact section
- Final booking CTA

---

### 🧘 Yoga Classes

Classes are dynamically loaded from the backend instead of being hardcoded in the frontend.

Users can:

- Browse available yoga classes
- View class descriptions
- View class imagery
- Select a specific class
- Open the booking flow directly for the selected class

Example practices include:

- Personal Yoga
- Beginner Flow
- Flexibility Focus
- Strength & Balance
- Mindfulness
- Online Sessions

Additional classes can be created and managed through the backend.

---

### 📅 Session Availability

Yoga classes are divided into individual sessions.

Users can:

- Select a date
- View sessions available for that date
- See session start and end times
- Identify free and paid sessions
- See session prices
- See whether a session is available or full
- Select a specific session

The booking interface only allows users to select valid future dates.

Past dates are automatically disabled.

If no sessions are available for the selected date, the user is informed instead of being shown an empty booking experience.

---

### 📝 Booking System

The booking flow is divided into multiple steps:

```text
Choose Practice
      ↓
Choose Date
      ↓
Select Session
      ↓
Enter Details
      ↓
Review / Submit