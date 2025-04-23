import {screen, render} from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import OpenSearchFiltersBtn from "../../../components/buttons/OpenSearchFiltersBtn";

jest.mock("../../assets/tune_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg", () => () => (
    <img alt="" />
))

describe("Open search filter button", () => {
    const user = userEvent.setup();

    it('snapshot match', () => {
        const {container} = render(<OpenSearchFiltersBtn />);
        expect(container).toMatchSnapshot()
    });

    it('should render button', () => {
        render(<OpenSearchFiltersBtn />);
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it('should show filter options on button click', async () => {
        render(<OpenSearchFiltersBtn/>);
        const button = screen.getByRole("button");
        await user.click(button);
        
        const popup = screen.getByTestId("filter-options")
        expect(popup).toBeInTheDocument()
    });

    it('should render popup at the position of the button', async () => {
        render(<OpenSearchFiltersBtn/>);
        const button = screen.getByRole("button");
        await user.click(button);

        const left = button.clientLeft;
        const top = button.clientTop;

        const popup = screen.getByTestId("filter-options");
        expect(popup.clientLeft).toEqual(left);
        expect(popup.clientTop).toEqual(top);
    });
})