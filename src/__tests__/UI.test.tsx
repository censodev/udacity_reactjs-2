import { act, fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store';
import { RouterProvider } from 'react-router-dom';
import router from '../router';

describe("UI", () => {
    it("snapshot", async () => {
        const component = render(
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        );
        expect(component).toMatchSnapshot();
    });
    it("dom load", async () => {
        await act(() => render(
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        ));
        const loginBtn = screen.getByTestId("btnLogin");
        expect(loginBtn).toBeInTheDocument()
    });
    it("login flow", async () => {
        await act(() => render(
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        ));

        fireEvent.change(screen.getByTestId('username'), { target: { value: 'sarahedo' } })
        fireEvent.change(screen.getByTestId('password'), { target: { value: 'password123' } })
        fireEvent.click(screen.getByTestId("btnLogin"))
        expect(screen.getByTestId("home")).toBeInTheDocument()
    });
});