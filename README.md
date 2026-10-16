# EventHub — Event Management System

A React + Redux Toolkit application built for Web Programming Assignment 2.
Users can browse events from the Ticketmaster API, register for events, and manage their registrations.

## Tech Stack

- React 19
- Redux Toolkit (state management)
- React Router v7 (client-side routing)
- Ticketmaster Discovery API (event data)
- Vite (build tool)

## Features

- User registration, login, and logout (frontend simulation)
- Auth state persisted in localStorage
- Browse and search events from Ticketmaster
- Filter by keyword, category, and city
- View full event details
- Register and cancel registration for events
- My Events page with upcoming and completed sections
- Protected routes (My Events requires login)
- Responsive layout

## Security Note

Authentication is a frontend-only simulation. Passwords are stored in plain text in localStorage. This is not suitable for production — a real app would use a backend with hashed passwords and JWT tokens.

## Setup Instructions

### 1. Clone the repository

git clone https://github.com/sdnr1418/event-management-system.git
cd event-management-system

### 2. Install dependencies

npm install

### 3. Add your Ticketmaster API key

Copy `.env.example` to `.env` and add your key:

cp .env.example .env

Then open `.env` and replace the placeholder:

VITE_TM_API_KEY=your_consumer_key_here

Get your free API key from: https://developer.ticketmaster.com/

### 4. Run the development server

npm run dev

Open http://localhost:5173 in your browser.

## Project Structure

src/
├── components/       Navbar, Layout, SearchFilters, FormInput, ProtectedRoute
├── pages/            Events, EventDetails, Login, Register, MyEvents, NotFound
├── store/            authSlice, eventsSlice, registrationsSlice, store.js
└── utils/            ticketmaster.js (API calls), storage.js (localStorage helper)

## API

This project uses the Ticketmaster Discovery API v2.
The Vite dev server proxies requests through `/tm-api` to avoid CORS issues.
Default country is set to US. The free tier allows 5,000 requests/day.