import { act, render, screen } from '@testing-library/react';
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
    it("tests login button text change on signing in", async () => {
        await act(() => render(
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        ));
        const loginBtn = screen.getByTestId("btnLogin");
        expect(loginBtn).toBeInTheDocument()
    });
});