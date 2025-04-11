import {render, screen} from '@testing-library/react';
import AddToWatchlistBtn from "../../components/buttons/AddToWatchlistBtn";
import userEvent from "@testing-library/user-event";

jest.mock("../../components/WatchlistPopup", () => () => (
    <div data-testid="watchlist-popup">Mocked Popup</div>
));

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

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

    it('renders button text', async () => {
        const user = userEvent.setup();

        render(<AddToWatchlistBtn movieId={1} isLoggedIn={true}/>);
        const button = screen.getByRole("button");
        await user.click(button);

        expect(screen.getByTestId("watchlist-popup")).toBeInTheDocument()
    });
});