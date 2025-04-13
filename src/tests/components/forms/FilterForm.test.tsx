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

    it('should submit form details', async () => {
        render(<FilterForm setFilterOptions={setFilterOptions} />)
        const button = screen.getByRole("button");
        await user.click(button);
        expect(setFilterOptions).toHaveBeenCalled();
    });

    it('should select multiple genre values from genre list', async () => {
        render(<FilterForm setFilterOptions={setFilterOptions} />)
        const genreSelect = screen.getByLabelText("Genres");
        await user.selectOptions(genreSelect, ["action", "thriller", "scifi"])
        const options = genreSelect.children;
        expect(options.namedItem("action")).toHaveAttribute("selected");
        expect(options.namedItem("thriller")).toHaveAttribute("selected");
        expect(options.namedItem("scifi")).toHaveAttribute("selected");
    });

    it('should select a release year range from release years', () => {

    });

    it('should select ascending from order type', async () => {
        render(<FilterForm setFilterOptions={setFilterOptions} />)
        const orderBySelect = screen.getByLabelText("Order By");
        await user.selectOptions(orderBySelect, "ascending")
        const options = orderBySelect.children;
        expect(options.namedItem("ascending")).toHaveAttribute("selected");
    });

    it('should select descending from order type', async () => {
        render(<FilterForm setFilterOptions={setFilterOptions} />)
        const orderBySelect = screen.getByLabelText("Order By");
        await user.selectOptions(orderBySelect, "descending")
        const options = orderBySelect.children;
        expect(options.namedItem("descending")).toHaveAttribute("selected");
    });

    it('should select watch providers', () => {

    });

    it('should select revenue from sort by field', async () => {
        render(<FilterForm setFilterOptions={setFilterOptions} />)
        const sortBySelect = screen.getByLabelText("Sort By");
        await user.selectOptions(sortBySelect, "revenue")
        const options = sortBySelect.children;
        expect(options.namedItem("revenue")).toHaveAttribute("selected");
    });

    it('should select title from sort by field', async () => {
        render(<FilterForm setFilterOptions={setFilterOptions} />)
        const sortBySelect = screen.getByLabelText("Sort By");
        await user.selectOptions(sortBySelect, "title")
        const options = sortBySelect.children;
        expect(options.namedItem("title")).toHaveAttribute("selected");
    });

    it('should select popularity from sort by field', async () => {
        render(<FilterForm setFilterOptions={setFilterOptions} />)
        const sortBySelect = screen.getByLabelText("Sort By");
        await user.selectOptions(sortBySelect, "popularity")
        const options = sortBySelect.children;
        expect(options.namedItem("popularity")).toHaveAttribute("selected");
    });
})