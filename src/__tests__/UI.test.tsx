import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store';
import { RouterProvider } from 'react-router-dom';
import router from '../router';
// import QuestNew from '../pages/QuestNew';
// import MainLayout from '../components/MainLayout';
// import Login from '../pages/Login';
// import Home from '../pages/Home';

describe("UI", () => {
    it("snapshot", async () => {
        const component = render(
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        );
        expect(component).toMatchSnapshot();
    });
    it("login page load", async () => {
        await act(() => render(
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        ));
        const loginBtn = screen.getByTestId("btnLogin");
        expect(loginBtn).toBeInTheDocument()
    });
    it("login flow - success", async () => {
        await act(() => render(
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        ));

        await act(async () => {
            fireEvent.change(screen.getByTestId('username'), { target: { value: 'sarahedo' } })
            fireEvent.change(screen.getByTestId('password'), { target: { value: 'password123' } })
        });

        expect(screen.getByTestId('username')).toHaveValue('sarahedo')
        expect(screen.getByTestId('password')).toHaveValue('password123')

        await act(async () => {
            fireEvent.click(screen.getByTestId("btnLogin"))
        })

        await waitFor(() => {
            expect(screen.getAllByText("Show").length).toBeGreaterThan(0)
        }, { timeout: 20000 });

        expect(screen.getByTestId("home")).toBeInTheDocument()
    });

    it("quest detail page load", async () => {
        await act(() => render(
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        ));
        await act(async () => {
            fireEvent.click(screen.getAllByText("Show").at(0) as HTMLElement)
        })
        expect(screen.getByTestId('questdetail')).toBeInTheDocument()
    });

    it("quest new page load", async () => {
        await act(() => render(
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        ));
        await act(async () => {
            fireEvent.click(screen.getByText("New"))
        })
        expect(screen.getByTestId('newForm')).toBeInTheDocument()
    });

    it("leaderboard new page load", async () => {
        await act(() => render(
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        ));
        await act(async () => {
            fireEvent.click(screen.getByText("Leaderboard"))
        })
        expect(screen.getByTestId('leaderboard')).toBeInTheDocument()
    });
});