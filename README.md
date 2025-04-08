# Welcome to Sivter's Documentation

Product Name: Sivter Streaming Explorer<br>
Version: Release Version 1<br>
Date: April 6, 2025<br>

Sivter is a streaming media explorer website built on the Next.js framework<br>
If you would like to get a quick feel, try spinning up a local server with node - [here's how it works](#running-the-development-server) <br>

## Index

1. [Introduction](#introduction)
    - 1.1 [Overview](#overview)
    - 1.2 [Features](#features)
2. [Demonstration](#demonstration)
3. [Technical Stack](#technical-stack)
    - 3.1 [Next.js](#nextjs)
    - 3.2 [React](#react)
    - 3.3 [TypeScript](#typescript)
4. [Project Structure](#project-structure)
5. [Dependencies](#dependencies)
6. [API Documentation](#api-documentation)
    - 6.1 [Movie Data API](#movie-data-api)
7. [Appendices](#appendices)

## 1. Introduction

### 1.1 Overview

Sivter is an online platform that allows users to explore the latest trending movies and TV shows. Leveraging the power of The Movie Database (TMDB) API, users can discover popular content, search for movies by title, and access detailed information about each film. Whether users are looking for information about a specific movie or want to stay updated with the latest trends, Sivter provides a seamless and user-friendly experience.

### 1.2 Features

- **Trending Content:** Stay up-to-date with the latest trends in movies and TV shows.
- **SearchBar Functionality:** SearchBar for movies by title, making it easy to find information about specific films.
- **Detailed Movie Information:** Access comprehensive details about each movie, including cast, crew, release date, genre, and more.
- **Watch Information:** Discover where users can watch a particular movie, whether it's available on popular streaming platforms or in theaters.

## 2. Demonstration

## 3. Technical Stack

### 3.1 Next.js

Next.js serves as the foundation of Sivter, providing server-side rendering and efficient page routing. Its flexibility allows for the creation of dynamic and responsive user interfaces, enhancing the overall user experience.

### 3.2 React

React is utilized to build interactive and reusable components, enabling the seamless construction of Sivter's user interface. The component-based architecture simplifies development and enhances the maintainability of the codebase.

### 3.3 TypeScript

TypeScript is employed for static typing, providing improved code quality and better development tooling. Its use contributes to a more robust and scalable codebase.

## 4. Project Structure

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

## 5. Dependencies

List and briefly describe the key dependencies used in the project.

## 6. API Documentation

### 6.1 The Movie Database API (TMDB)

The Movie Explorer interacts with the TMDB API to fetch data about trending movies, search results, and detailed movie information. Refer to the TMDB API documentation for detailed information about available endpoints and usage.

## 7. Appendices

