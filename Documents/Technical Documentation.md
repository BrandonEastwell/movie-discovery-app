# Welcome to Sivter's Documentation

Product Name: Sivter Streaming Explorer<br>
Version: MVP Version 1 <br>
Phase: Development <br>
Date: Oct 15, 2023<br>

Sivter is a streaming media explorer website built on the Next.js framework<br>
If you would like to get a quick feel, try spinning up a local server with node - [here's how it works](#running-the-development-server) <br>

## Index

1. [Introduction](#introduction)
    - 1.1 [Overview](#overview)
    - 1.2 [Features](#features)

2. [Technical Stack](#technical-stack)
    - 2.1 [Next.js](#nextjs)
    - 2.2 [React](#react)
    - 2.3 [TypeScript](#typescript)

3. [Project Structure](#project-structure)

4. [Installation](#installation)

5. [Configuration](#configuration)
    - 5.1 [Environment Variables](#environment-variables)
    - 5.2 [API Key](#api-key)

6. [Dependencies](#dependencies)

7. [Development](#development)
    - 7.1 [Running the Development Server](#running-the-development-server)
    - 7.2 [Code Guidelines](#code-guidelines)

8. [Testing](#testing)
    - 8.1 [Unit Tests](#unit-tests)

9. [Deployment](#deployment)
    - 9.1 [Build](#build)
    - 9.2 [Deploying to Production](#deploying-to-production)

10. [API Documentation](#api-documentation)
    - 10.1 [Movie Data API](#movie-data-api)

11. [Appendices](#appendices)

12. [Troubleshooting](#troubleshooting)

13. [Contributing](#contributing)

14. [License](#license)

## 1. Introduction

### 1.1 Overview

Sivter is an online platform that allows users to explore the latest trending movies and TV shows. Leveraging the power of The Movie Database (TMDB) API, users can discover popular content, search for movies by title, and access detailed information about each film. Whether users are looking for information about a specific movie or want to stay updated with the latest trends, Sivter provides a seamless and user-friendly experience.

### 1.2 Features

- **Trending Content:** Stay up-to-date with the latest trends in movies and TV shows.
- **Search Functionality:** Search for movies by title, making it easy to find information about specific films.
- **Detailed Movie Information:** Access comprehensive details about each movie, including cast, crew, release date, genre, and more.
- **Watch Information:** Discover where users can watch a particular movie, whether it's available on popular streaming platforms or in theaters.

## 2. Technical Stack

### 2.1 Next.js

Next.js serves as the foundation of Sivter, providing server-side rendering and efficient page routing. Its flexibility allows for the creation of dynamic and responsive user interfaces, enhancing the overall user experience.

### 2.2 React

React is utilized to build interactive and reusable components, enabling the seamless construction of Sivter's user interface. The component-based architecture simplifies development and enhances the maintainability of the codebase.

### 2.3 TypeScript

TypeScript is employed for static typing, providing improved code quality and better development tooling. Its use contributes to a more robust and scalable codebase.

## 3. Project Structure

The project is organized into clear and intuitive directories: <br>
**`project/src/`**
- **`components`:** Contains reusable React components used throughout the application.
- **`apis`:** Contains responsible API components handling fetch requests to services and server resources
- **`app`:** Houses the routes to server components with Next.js app routing, each folder represents a route segment
- **`images`:** Stores image assets

**`project/src/app/`**
- **`(auth)`:** Contains routing to authentication services such as login and signup
- **`styles`:** Stores stylesheets and other styling-related assets.
- **`admin`:** Contains routing to admin control panel to visually control and update dynamic content
- **`product[id]`:** Routing to a media product page that displays movie information



## 4. Installation

To install the streaming explorer locally, follow these steps:

```bash
# Clone the repository
git clone https://github.com/brandoneastwell/movie-explorer.git

# Navigate to the project directory
cd movie-explorer

# Install dependencies
npm install
```
## 5. Configuration

### 5.1 Environment Variables

The streaming explorer relies on the following environment variables:

- **`REACT_APP_TMDB_API_KEY`:** Your TMDB API key for accessing movie data.

### 5.2 API Key

To obtain a TMDB API key, visit the TMDB website and create an account. Once registered, you can generate an API key to enable seamless integration with Sivter.

## 6. Dependencies

List and briefly describe the key dependencies used in the project.

## 7. Development

### 7.1 Running the Development Server

To start the development server and preview the Movie Explorer locally, run:

```bash
npm run dev
```

### 7.2 Code Guidelines

The codebase adheres to industry-standard coding conventions and follows the guidelines outlined in the project's contributing documentation.

## 8. Testing

### 8.1 Unit Tests

To start the development server and preview the Movie Explorer locally, run:

```bash
npm run test
```

## 9. Deployment

### 9.1 Build

To build the project for production, execute:

```bash
npm run build
```

### 9.2 Deploying to Production

Deploy the application to a production environment using the deployment instructions outlined in the project's deployment documentation.

## 10. API Documentation

### 10.1 The Movie Database API (TMDB)

The Movie Explorer interacts with the TMDB API to fetch data about trending movies, search results, and detailed movie information. Refer to the TMDB API documentation for detailed information about available endpoints and usage.

## 12. Appendices

## 13. Troubleshooting

Offer solutions to common issues or errors that developers might encounter.

## 14. Contributing

Provide guidelines for developers who wish to contribute to the project.

## 15. License

Specify the license under which the project is released.


