import { Outlet } from "@tanstack/react-router";

export default function MainLayout() {
    return (
        <>
            <h2>Layout</h2>
            <Outlet />
        </>
    )
}