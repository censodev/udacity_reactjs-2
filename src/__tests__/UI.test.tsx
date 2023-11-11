import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store';
import { RouterProvider } from '@tanstack/react-router';
import router from '../route';

describe('UI', () => {
    test('login flow', async () => {
        render(
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>);

        setTimeout(() => {
            expect(screen.queryByTestId('home')).toBeNull();

            const id = 'sarahedo';
            const password = 'password123';

            fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: id } });
            fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: password } });

            fireEvent.click(screen.getByTestId('btnLogin'));

            expect(screen.queryByTestId('home')).toBeDefined();
        }, 500)
    });
});