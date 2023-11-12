import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store';
import { RouterProvider } from 'react-router-dom';
import router from '../router';

describe("snapshot", () => {
    it("snapshot", async () => {
        const component = render(
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        );
        expect(component).toMatchSnapshot();
    });
});