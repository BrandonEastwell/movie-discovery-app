import {FormEvent} from "react";
import {idToGenreNameMapping} from "../../lib/utils/types/genres";

export default function FilterForm({setFilterOptions} : {setFilterOptions: () => void}) {
    let genres = [];

    const formSubmit = (event: FormEvent<HTMLFormElement>) => {
        setFilterOptions()
    }

    for (const [id, name] of Object.entries(idToGenreNameMapping)) {
        genres.push({id: id, name: name});
    }

    return (
        <form data-testid="filters-form" onSubmit={formSubmit}>
            <label htmlFor="genres-select">Genres</label>
            <select id="genres-select" name="genres" multiple>
                {genres.map((genre) => (
                    <option key={genre.id} id={genre.id} value={genre.name}>{genre.name}</option>
                ))}
            </select>
            <label htmlFor="order-select">Order By</label>
            <select id="order-select" name="order-by">
                <option value="Ascending">Ascending</option>
                <option value="Descending">Descending</option>
            </select>
            <label htmlFor="sort-select">Sort By</label>
            <select id="sort-select" name="sort-by">
                <option value="Popularity">Popularity</option>
                <option value="Revenue">Revenue</option>
                <option value="Release Date">Release Date</option>
                <option value="Title">Title</option>
                <option value="Votes">Votes</option>
            </select>
            <button type={"submit"}></button>
        </form>
    )
}

// TODOS
// Release Year From, To
// Sort by popularity, revenue, primary release date, title, vote count
// Sort by Ascending or Descending
// Release Year
// Watch Providers
// Genres