## Blynde E-Commerce Platform

A full-stack e-commerce application built with React (frontend) and Django (backend).  
This project demonstrates a scalable architecture, modern UI, and robust API integration.

---

## Features

- Modern React frontend with Vite, Tailwind CSS, and TypeScript
- Django REST API backend with PostgreSQL support
- Authentication, protected routes, and JWT integration
- Product catalog, cart, wishlist, and checkout flow
- Payment gateway integration (Esewa example)
- Image management via ImageKit.io CDN
- Responsive design and reusable components
- State management with Redux
- Toast notifications and error handling
- Admin panel for product management

---

## Project Structure

```
client/   # React frontend
server/   # Django backend
```

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- Python (v3.10+)
- Poetry (for backend dependency management)
- PostgreSQL (or Railway DB)
- ImageKit.io account (for image CDN)

---

### Backend Setup (Django)

1. Install Poetry:
   ```sh
   curl -sSL https://install.python-poetry.org | python3 -
   ```
2. Install dependencies:
   ```sh
   cd server
   poetry install
   ```
3. Configure environment variables in `server/.env` (see sample in repo).
4. Run migrations:
   ```sh
   poetry run python manage.py migrate
   ```
5. Start the server:
   ```sh
   poetry run python manage.py runserver
   ```

---

### Frontend Setup (React)

1. Install dependencies:
   ```sh
   cd client
   npm install
   ```
2. Configure environment variables in `client/.env` (see sample in repo).
3. Start the development server:
   ```sh
   npm run dev
   ```

---

## Environment Variables

- Backend: `server/.env` (Django, DB, ImageKit, Email, JWT, etc.)
- Frontend: `client/.env` (API endpoints, keys, etc.)

---

## Deployment

- Frontend: Deploy with Netlify (see `client/netlify.toml`)
- Backend: Deploy with Railway, Heroku, or your preferred platform

---

## API Documentation

- Django REST API endpoints are documented in the backend code.
- Frontend uses Axios for API calls (see `client/src/lib/axios/`).

---

## Contributing

1. Fork the repo
2. Create a feature branch
3. Commit your changes
4. Open a pull request

---

## License

MIT

---

## Credits

- React, Vite, Tailwind CSS, Redux
- Django, Django REST Framework
- ImageKit.io, Esewa

---
