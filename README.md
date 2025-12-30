# Mailify

A full-stack Gmail-like application built with Node.js and React. Implements user authentication, email management, and a clean, responsive interface inspired by Gmail.

## Features

* User authentication with JWT
* Compose, send, receive, and delete emails
* Inbox, Sent, and Trash views
* Protected routes and middleware
* Responsive UI with basic validation and error handling

## Tech Stack

**Backend**

* Node.js
* Express.js
* MongoDB with Mongoose
* JWT authentication

**Frontend**

* React (Vite)
* CSS Modules
* Axios

## Project Structure

```
backend/    # API, auth, database
frontend/   # React client
```

## Getting Started

**Requirements:** Node.js v16+, MongoDB

```bash
# Backend
cd backend
npm install
npm start

# Frontend
cd frontend
npm install
npm run dev
```

## API Routes

* `/api/auth` – Login and signup
* `/api/email` – Email operations
* `/api/user` – User-related actions

## License

MIT License
