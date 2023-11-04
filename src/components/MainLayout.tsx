import { UserOutlined } from "@ant-design/icons";
import { Outlet, useNavigate } from "@tanstack/react-router";
import { Avatar, Dropdown, Menu, MenuProps } from "antd";
import Title from "antd/es/typography/Title";
import { useState } from "react";

const items: MenuProps['items'] = [
    {
        label: 'Home',
        key: 'home',
    },
    {
        label: 'Leaderboard',
        key: 'leaderboard',
    },
    {
        label: 'New',
        key: 'new',
    },
];

const avatarMenuItems: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <a href="/login">Logout</a>
        ),
    },
];

export default function MainLayout() {
    const navigator = useNavigate()
    const [current, setCurrent] = useState('home');
    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
        switch (e.key) {
            case 'home':
                navigator({ to: '/' })
                break
            case 'leaderboard':
                navigator({ to: '/leaderboard' })
                break
            case 'new':
                navigator({ to: '/quest/new' })
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
                        <Title level={5} style={{ margin: '0 0.5rem 0 0' }}>Umi</Title>
                        <Avatar icon={<UserOutlined />}></Avatar>
                    </div>
                </Dropdown>
            </div>
            <Outlet />
        </>
    )
}