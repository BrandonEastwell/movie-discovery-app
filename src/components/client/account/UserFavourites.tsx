import {FavouriteMoviesList} from "./FavouriteMoviesList";
import React from "react";
import {AuthService} from "../../../lib/services/authService";
import {FavouritesService} from "../../../lib/services/favouritesService";

export default async function UserFavourites() {
    const user = await AuthService.getAuthState();
    let favouriteMovies : Movie[] = [];
    if (user.isLoggedIn && user.userData) {
        favouriteMovies = await FavouritesService.getFavouriteMovies(user.userData?.userid)
    }

    return (
        <FavouriteMoviesList initialMovies={favouriteMovies} />
    )
}