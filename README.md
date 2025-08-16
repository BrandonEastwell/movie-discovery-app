# Sivter - Movie Discovery App

`Sivter` is a movie explorer web app built on the Next.js framework that aims to enhance the way the next movie to
watch is found.

<p style="align-self: center">
  <img src="./img/landing-demo.gif" alt="Sivter Landing Demo" style="width:100%; max-width:800px;" />
</p>

# Contents

- [Why?](#why)
- [Features](#features)
- [Demonstration](#demonstration)
- [Technical Stack](#technical-stack)
- [Known Issues](#known-issues)
- [License](#license)

## Why?

As a movie enthusiast and developer, I wanted a tool to streamline the search for the next movie to watch without having to hop between streaming platforms. This project helped me explore server side rendering, restful APIs, JWT authentication and database design to enable CRUD operations.

## Features

- **Trending Content:** Stay up-to-date with the latest trends in movies and TV shows.
- **Search Functionality:** Search for movies by title, making it easy to find information about specific films.
- **Detailed Movie Information:** Access comprehensive details about each movie, including cast, crew, release date, genre, and more.
- **Watch Information:** Discover where users can watch a particular movie, whether it's available on popular streaming platforms or in theaters.

## Demonstration

>The following demonstrations show key interactions and features in action.

### Account Creation

<p style="align-self: center">
  <img src="./img/signup-demo.gif" alt="Sivter Landing Demo" style="width:100%; max-width:800px;" />
</p>

---

### Create Favourite Movies

<p style="align-self: center">
  <img src="./img/favourite-demo.gif" alt="Sivter Landing Demo" style="width:100%; max-width:800px;" />
</p>

---

### Create Watchlists

<p style="align-self: center">
  <img src="./img/watchlist-demo.gif" alt="Sivter Landing Demo" style="width:100%; max-width:800px;" />
</p>

---

### Add Movies to Watchlists

<p style="align-self: center">
  <img src="./img/watchlist-page-demo.gif" alt="Sivter Landing Demo" style="width:100%; max-width:800px;" />
</p>

---

### Tailored Movie Recommendations

<p style="align-self: center">
  <img src="./img/suggestions-demo.gif" alt="Sivter Landing Demo" style="width:100%; max-width:800px;" />
</p>

## Technical Stack

- **Frameworks**: Next.js
- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: REST API, Prisma ORM, PostgreSQL
- **Data Fetching**: TMDB API
- **Testing**: React Testing Library, Jest
- **Deployment**: Vercel, Supabase
- **Tools**: Figma, ESLint

## Known Issues
- No way to reset password once forgotten
- No mobile responsiveness, mistakenly built with desktop first approach (next to fix)
- No custom error handling on page load errors (default next error page)
- Need to pre-fetch and cache API calls to watchlists when user clicks add movie to watchlist (Calls fetch every watchlist popup)

## Todo
> Feature list planned to be worked on in the future
- **Live Discussion**: Movie discussion threads with WebSocket
- **Friend Lists**: Add, remove, compare movies with friends.
- **Movie Night Suggestor**: Compares favourite movies together with selected friends, suggests a movie.
- **Movie Discovery Queue**: A queue based discovery tool to browse through suggested movies.
- **Profile Customisation**: Profile icons
- **Account Management**: Forgotten password, change password, username

## License
This project is licensed under the MIT License.
