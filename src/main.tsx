import React from 'react'
import ReactDOM from 'react-dom/client'
import store from './store'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Login from './pages/Login'
import MainLayout from './components/MainLayout'
import Home from './pages/Home'
import QuestNew from './pages/QuestNew'
import QuestDetail from './pages/QuestDetail'
import Leaderboard from './pages/Leaderboard'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/leaderboard',
        element: <Leaderboard />,
      },
      {
        path: '/add',
        element: <QuestNew />,
      },
      {
        path: '/quest/:id',
        element: <QuestDetail />,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
