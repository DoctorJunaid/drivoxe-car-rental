
GitHub topics
react, vite, redux-toolkit, react-router, tailwindcss, framer-motion, car-rental, supabase, vercel, javascript

<p align="center">
  <img src="/src/assets/thumbnail.png" alt="Drivoxe Car Rental" width="100%" style="max-width:900px; border-radius:12px;" />
</p>
Release notes (GitHub Release v1.0.0) <br>
- Added:
    - Pages: Home, Cars, Car Details, Cart, Contact, FAQs, About, 404
    - Global state: cart, cars (Redux Toolkit)
    - Client-side routing (React Router)
    - Animations (framer-motion)
    - Responsive UI (Tailwind CSS)
    - Build tooling: Vite; Deployment: Vercel
- Upcoming:
    - Supabase authentication (email/password + OAuth)
    - Booking workflow and payments
    - Profile, orders, and admin basics
- Tech:
  React 19, React Router 7, Redux Toolkit 2, Tailwind CSS 4, framer-motion 12, Vite

# Drivoxe Car Rental

A modern car rental web app built with React, Vite, Tailwind CSS, Redux Toolkit, and framer-motion.

- Live: https://drivoxe-car-rental.vercel.app/
- GitHub: https://github.com/doctorJunaid/drivoxe-car-rental

## Status
Version 1.0.0 released. Core UI and cart flow are live. Login/auth via Supabase coming soon.

## Features
- Pages: Home, Cars, Car Details, Cart, Contact, FAQs, About, 404
- State management with Redux Toolkit
- Client-side routing with React Router
- Smooth animations with framer-motion
- Responsive UI with Tailwind CSS
- Vite dev/build and Vercel deploy

## Roadmap
- Supabase authentication (login/signup, session management)
- Bookings flow and payments
- User profiles and order history
- Basic admin for cars and orders

## Tech Stack
- React 19, React Router 7
- Redux Toolkit 2
- Tailwind CSS 4
- framer-motion 12
- Vite
- Deployed on Vercel

## Getting Started
Prerequisites: Node 18+

1. Clone
   git clone https://github.com/YourUser/drivoxe-car-rental.git
   cd drivoxe-car-rental

2. Install
   npm install

3. Env
    - Copy .env.local.example to .env.local (create if missing)
    - Add placeholders now; Supabase keys will be used when auth lands:
      VITE_SUPABASE_URL=
      VITE_SUPABASE_ANON_KEY=

4. Run
   npm run dev

5. Build
   npm run build
   npm run preview

## Project Scripts
- dev: Start Vite dev server
- build: Production build
- preview: Preview production build
- lint: Lint with ESLint

## Folder Structure
- src/Pages: Route pages
- src/Components: Reusable UI components
- src/Redux: Slices/store
- src/assets: Images and static assets
- src/main.jsx: App bootstrap
- vite.config.js: Vite config

## Contributing
Issues and PRs welcome. Please open an issue before large changes.
DoctorJunaid

## License
MIT

## Acknowledgements
Thanks to my teacher/mentor @YourTeacherName for guidance.

Repo files to add/update
- README.md: replace with the above.
- .env.local.example:
  VITE_SUPABASE_URL=
  VITE_SUPABASE_ANON_KEY=
- GitHub Release: tag v1.0.0 with the release notes above.
- GitHub description and topics: set as above.

Need me to personalize teacher handle, live URL, and repo link? Send them and I’ll finalize.