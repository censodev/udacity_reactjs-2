import { RootRoute, Route, Router } from "@tanstack/react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Leaderboard from "./pages/Leaderboard";
import QuestNew from "./pages/QuestNew";
import MainLayout from "./components/MainLayout";
import App from "./App";
import QuestDetail from "./pages/QuestDetail";

const rootRoute = new RootRoute({
    component: App,
})
const layoutRoute = new Route({
    getParentRoute: () => rootRoute,
    id: 'layout',
    component: MainLayout,
})
const loginRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/login',
    component: Login,
})
const homeRoute = new Route({
    getParentRoute: () => layoutRoute,
    path: '/',
    component: Home,
})
const leaderboardRoute = new Route({
    getParentRoute: () => layoutRoute,
    path: '/leaderboard',
    component: Leaderboard,
})
const questNewRoute = new Route({
    getParentRoute: () => layoutRoute,
    path: '/quest/new',
    component: QuestNew,
})
const questDetailRoute = new Route({
    getParentRoute: () => layoutRoute,
    path: '/quest/$id',
    component: QuestDetail,
    loader: ({ params: { id } }) => {
        return id
    },
})
const routeTree = rootRoute.addChildren([
    loginRoute,
    layoutRoute.addChildren([
        homeRoute,
        leaderboardRoute,
        questNewRoute,
        questDetailRoute,
    ]),
])
const router = new Router({ routeTree })

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

export default router