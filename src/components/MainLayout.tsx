import { UserOutlined } from "@ant-design/icons";
import { Outlet, useNavigate } from "@tanstack/react-router";
import { Avatar, Dropdown, Menu, MenuProps } from "antd";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

const items: MenuProps['items'] = [
    {
        label: 'Home',
        key: '/',
    },
    {
        label: 'Leaderboard',
        key: '/leaderboard',
    },
    {
        label: 'New',
        key: '/add',
    },
];

const avatarMenuItems: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <a href="/login" onClick={() => useAuth().logout()}>Logout</a>
        ),
    },
];

export default function MainLayout() {
    const auth = useAuth()
    useEffect(() => {
        if (!auth.isAuthenticated()) {
            window.location.href = '/login'
        }
        setCurrent(window.location.pathname)
    }, [auth])
    const navigate = useNavigate()
    const [current, setCurrent] = useState('home');
    const onClick: MenuProps['onClick'] = (e) => {
        switch (e.key) {
            case '/':
                navigate({ to: '/' })
                break
            case '/leaderboard':
                navigate({ to: '/leaderboard' })
                break
            case '/add':
                navigate({ to: '/add' })
                break
        }
    };
    return (
        <>
            <div style={{
                display: 'flex',
            }}>
                <Menu style={{
                    flexGrow: '1'
                }} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
                <Dropdown menu={{ items: avatarMenuItems }} placement="bottomRight" >
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        borderBottom: '1px solid rgba(5, 5, 5, 0.06)',
                    }}>
                        <Title level={5} style={{ margin: '0 0.5rem 0 0' }}>{auth.user()?.name}</Title>
                        <Avatar icon={<UserOutlined />}></Avatar>
                    </div>
                </Dropdown>
            </div>
            <Outlet />
        </>
    )
}