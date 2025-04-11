import {render, screen} from '@testing-library/react';
import AddToWatchlistBtn from "../../../components/buttons/AddToWatchlistBtn";
import userEvent from "@testing-library/user-event";

jest.mock("../../../components/buttons/WatchlistPopup", () => () => (
    <div data-testid="watchlist-popup">Mocked Popup</div>
));

jest.mock("../../../components/form/AuthPopup", () => () => (
    <form data-testid="form-popup">Mocked Form</form>
));

describe('Add to watchlist button', () => {
    beforeEach(() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({}),
            })
        ) as jest.Mock;
    });

    it('should render AddToWatchListBtn', () => {
        const { container } = render(<AddToWatchlistBtn movieId={1} isLoggedIn={true} />);
        expect(container).toMatchSnapshot();
    });

    it('renders popup on button click', async () => {
        const user = userEvent.setup();

        render(<AddToWatchlistBtn movieId={1} isLoggedIn={true}/>);
        const button = screen.getByRole("button");
        await user.click(button);

        expect(screen.getByTestId("watchlist-popup")).toBeInTheDocument()
    });

    it('should render popup login form', async () => {
        const user = userEvent.setup();

        render(<AddToWatchlistBtn movieId={1} isLoggedIn={false} />);
        const button = screen.getByRole("button");
        await user.click(button);

        expect(screen.getByTestId("form-popup")).toBeInTheDocument()
    });
});