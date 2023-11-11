import { Avatar, Dropdown, Menu, MenuProps } from "antd";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

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
    const navigate = useNavigate()
    const [current, setCurrent] = useState('home');
    useEffect(() => {
        setCurrent(window.location.pathname)
    }, [])
    const onClick: MenuProps['onClick'] = (e) => {
        switch (e.key) {
            case '/':
                navigate('/')
                break
            case '/leaderboard':
                navigate('/leaderboard')
                break
            case '/add':
                navigate('/add')
                break
        }
    };
    if (!auth.isAuthenticated()) {
        return <Navigate to='/login' />
    }
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
                        <label style={{ margin: '0 0.5rem 0 0' }}>{auth.user()?.name}</label>
                        <Avatar icon={<UserOutlined />}></Avatar>
                    </div>
                </Dropdown>
            </div>
            <Outlet />
        </>
    )
}