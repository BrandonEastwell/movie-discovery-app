import {screen, render, waitFor} from "@testing-library/react"
import AddToFavouriteBtn from "../../../components/buttons/AddToFavouriteBtn";
import userEvent from "@testing-library/user-event";
import {toggleFavouriteMovie} from "../../../lib/api/client_requests/favourites";
import {useState} from "react";

jest.mock("../../../components/forms/AuthPopup", () => () => (
    <form data-testid="auth-popup"></form>
));

jest.mock("../../../lib/api/client_requests/favourites");

function TestWrapper({favourite, isLoggedIn} : {favourite: boolean, isLoggedIn: boolean}) {
    const [isFavourite, setIsFavourite] = useState(favourite); // Mocking lifted state

    return (
        <AddToFavouriteBtn isLoggedIn={isLoggedIn} setIsFavourite={setIsFavourite} isFavourite={isFavourite} movieId={0} />
    )
}

describe("Add to favourites button", () => {
    const user = userEvent.setup();

    it('should render a button', () => {
        const {container} = render(<TestWrapper favourite={false} isLoggedIn={false} />)
        expect(container).toMatchSnapshot();
    });

    it('should render auth form on button click if user not logged in', async () => {
        render(<TestWrapper favourite={false} isLoggedIn={false} />)
        const button = screen.getByRole('button');
        await user.click(button);
        expect(screen.getByTestId("auth-popup")).toBeInTheDocument();
    });

    it('should render a white svg if movie is not a favourite', () => {
        const { container } = render(<TestWrapper favourite={false} isLoggedIn={false} />)
        const svg = container.querySelector('svg');
        expect(svg?.classList).toContain('text-pearl-white')
    });

    it('should render a purple svg if movie is a favourite', () => {
        const { container } = render(<TestWrapper favourite={true} isLoggedIn={false} />)
        const svg = container.querySelector('svg');
        expect(svg?.classList).toContain('text-Purple');
    });

    it('should render a purple svg if button is clicked and API call succeeds', async () => {
        (toggleFavouriteMovie as jest.Mock).mockResolvedValue({success: true});

        const { container } = render(<TestWrapper favourite={false} isLoggedIn={true} />)
        const svg = container.querySelector("svg");
        const button = screen.getByRole("button");
        await user.click(button);

        expect(svg?.classList).toContain("text-Purple");
    });

    it('should render a white svg if button is clicked and API call fails', async () => {
        (toggleFavouriteMovie as jest.Mock).mockResolvedValue({success: false});

        const { container } = render(<TestWrapper favourite={false} isLoggedIn={true} />)
        const svg = container.querySelector("svg");
        const button = screen.getByRole("button");
        await user.click(button);

        expect(svg?.classList).toContain("text-pearl-white");
    });

    it('should render back to a white svg if button is clicked and API call fails', async () => {
        (toggleFavouriteMovie as jest.Mock).mockResolvedValue({success: false});

        const { container } = render(<TestWrapper favourite={false} isLoggedIn={true} />)
        const svg = container.querySelector("svg");
        const button = screen.getByRole("button");
        await user.click(button);
    });
})