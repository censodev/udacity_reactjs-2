import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import QuestNew from "./pages/QuestNew";
import QuestDetail from "./pages/QuestDetail";
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
])
export default router