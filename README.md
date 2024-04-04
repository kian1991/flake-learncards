# Flake Academy - Host your own Flashcard Learning System

## Introduction

Flake Academy is a flashcard learning system that allows users to create, edit, and delete flashcards. Users can login with either Google or GitHub

## Features: Whats in here?

- Create, edit, and delete flashcards
- Login with Google or GitHub
- Learn Mode: Users can test their knowledge by flipping through flashcards
- Dark Mode: Users can toggle between light and dark mode
- Responsive Design: The app is optimized for mobile, tablet, and desktop

## Technologies Used

- React
- PostgreSQL with Prisma
- Next.js
- shadcn/ui
- docker
- tailwindcss

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file in the root directory and add the following environment variables:

```
DATABASE_URL="postgresql://<username>:<password>@localhost:5432/<database>"
GOOGLE_CLIENT_ID="<google-client-id>"
GOOGLE_CLIENT_SECRET="<google-client-secret>"
GITHUB_CLIENT_ID="<github-client-id>"
GITHUB_CLIENT_SECRET="<github-client-secret>"
AUTH_SECRET="<auth-secret>"
``
```

4. Run the Docker container: `docker-compose up -d`
5. Run the Prisma migration: `npx prisma generate && npx prisma migrate dev`
6. Run the development server: `npm run dev`
