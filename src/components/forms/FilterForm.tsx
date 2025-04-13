import {FormEvent} from "react";
import {idToGenreNameMapping} from "../../lib/utils/types/genres";

export default function FilterForm({setFilterOptions} : {setFilterOptions: () => void}) {
    const formSubmit = (event: FormEvent<HTMLFormElement>) => {
        setFilterOptions()
    }

    return (
        <form data-testid="filters-form" onSubmit={formSubmit}>
            <button type={"submit"}></button>
            <label htmlFor="genres-select">Genres</label>
            <select id="genres-select" name="genres" multiple>
                <option id="action" value="action">action</option>
                <option id="thriller" value="thriller">thriller</option>
                <option id="scifi" value="scifi">scifi</option>
            </select>
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