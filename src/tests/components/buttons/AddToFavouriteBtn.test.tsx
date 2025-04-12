import {screen, render, waitFor} from "@testing-library/react"
import AddToFavouriteBtn from "../../../components/buttons/AddToFavouriteBtn";
import userEvent from "@testing-library/user-event";
import {toggleFavouriteMovie} from "../../../lib/api/client_requests/favourites";

jest.mock("../../../components/forms/AuthPopup", () => () => (
    <form data-testid="auth-popup"></form>
));

jest.mock("../../../lib/api/client_requests/favourites");

describe("Add to favourites button", () => {
    const user = userEvent.setup();

    it('should render a button', () => {
        const {container} = render(<AddToFavouriteBtn isFavourite={false} isLoggedIn={false} movieId={1} />)
        expect(container).toMatchSnapshot();
    });

    it('should render auth form on button click if isLoggedIn is false', async () => {
        render(<AddToFavouriteBtn isFavourite={false} isLoggedIn={false} movieId={1} />)
        const button = screen.getByRole('button');
        await user.click(button);
        expect(screen.getByTestId("auth-popup")).toBeInTheDocument();
    });

    it('should render a white svg if isFavourite prop is false', () => {
        const { container } = render(<AddToFavouriteBtn isFavourite={false} isLoggedIn={false} movieId={1} />)
        const svg = container.querySelector('svg');
        expect(svg?.classList).toContain('text-pearl-white')
    });

    it('should render a purple svg if isFavourite prop is true', () => {
        const { container } = render(<AddToFavouriteBtn isFavourite={true} isLoggedIn={false} movieId={1} />)
        const svg = container.querySelector('svg');
        expect(svg?.classList).toContain('text-Purple');
    });

    it('should render a purple svg if button is clicked and API call succeeds', async () => {
        (toggleFavouriteMovie as jest.Mock).mockResolvedValue({success: true});

        const { container } = render(<AddToFavouriteBtn isFavourite={false} isLoggedIn={true} movieId={1} />)
        const svg = container.querySelector("svg");
        const button = screen.getByRole("button");
        await user.click(button);

        expect(svg?.classList).toContain("text-Purple");
    });

    it('should render a white svg if button is clicked and API call fails', async () => {
        (toggleFavouriteMovie as jest.Mock).mockResolvedValue({success: false});

        const { container } = render(<AddToFavouriteBtn isFavourite={false} isLoggedIn={true} movieId={1} />)
        const svg = container.querySelector("svg");
        const button = screen.getByRole("button");
        await user.click(button);

        expect(svg?.classList).toContain("text-pearl-white");
    });
})