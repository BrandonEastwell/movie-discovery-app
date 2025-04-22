import {screen, render} from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import FilterForm from "../../../components/forms/FilterForm";

describe("Change search filters using filter form", () => {
    const user = userEvent.setup();
    const setFilterOptions = jest.fn();

    it('should render form', () => {
        render(<FilterForm setFilterOptions={() => {}}/>)
        const form = screen.getByTestId("filters-form")
        expect(form).toBeInTheDocument();
    });

    /**
    it('should submit form details', async () => {
        render(<FilterForm setFilterOptions={setFilterOptions} />)
        const button = screen.getByRole("button");
        await user.click(button);
        expect(setFilterOptions).toHaveBeenCalled();
    });
     **/

    it('should select multiple genre values from genre list', async () => {
        render(<FilterForm setFilterOptions={() => {}} />)
        const genreSelect = screen.getByLabelText("Genres");
        await user.selectOptions(genreSelect, ["Action", "Thriller", "Comedy"]);
        const options = screen.getAllByRole("option", {selected: true});
        expect(options.map(opt => opt.textContent)).toEqual(expect.arrayContaining(["Action", "Thriller", "Comedy"]));
    });

    it('should select ascending from order type', async () => {
        render(<FilterForm setFilterOptions={setFilterOptions} />)
        const orderBySelect = screen.getByLabelText("Order By");
        await user.selectOptions(orderBySelect, "Ascending")
        const options = screen.getAllByRole("option", {selected: true});
        expect(options.map(opt => opt.textContent)).toEqual(expect.arrayContaining(["Ascending"]));
    });

    it('should select descending from order type', async () => {
        render(<FilterForm setFilterOptions={setFilterOptions} />)
        const orderBySelect = screen.getByLabelText("Order By");
        await user.selectOptions(orderBySelect, "Descending")
        const options = screen.getAllByRole("option", {selected: true});
        expect(options.map(opt => opt.textContent)).toEqual(expect.arrayContaining(["Descending"]));
    });

    it('should select revenue from sort by field', async () => {
        render(<FilterForm setFilterOptions={setFilterOptions} />)
        const sortBySelect = screen.getByLabelText("Sort By");
        await user.selectOptions(sortBySelect, "Revenue")
        const options = screen.getAllByRole("option", {selected: true});
        expect(options.map(opt => opt.textContent)).toEqual(expect.arrayContaining(["Revenue"]));
    });

    it('should select title from sort by field', async () => {
        render(<FilterForm setFilterOptions={setFilterOptions} />)
        const sortBySelect = screen.getByLabelText("Sort By");
        await user.selectOptions(sortBySelect, "Title")
        const options = screen.getAllByRole("option", {selected: true});
        expect(options.map(opt => opt.textContent)).toEqual(expect.arrayContaining(["Title"]));
    });

    it('should select popularity from sort by field', async () => {
        render(<FilterForm setFilterOptions={setFilterOptions} />)
        const sortBySelect = screen.getByLabelText("Sort By");
        await user.selectOptions(sortBySelect, "Popularity")
        const options = screen.getAllByRole("option", {selected: true});
        expect(options.map(opt => opt.textContent)).toEqual(expect.arrayContaining(["Popularity"]));
    });
})