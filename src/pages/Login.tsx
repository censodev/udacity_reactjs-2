import { Button, Form, Input } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import useAuth from '../hooks/useAuth';
import { useNavigate, useSearchParams } from 'react-router-dom';
export default function Login() {
    const auth = useAuth()
    const navigate = useNavigate()
    const [searchParams,] = useSearchParams()
    async function onFinish({ username, password }: { username: string, password: string }): Promise<void> {
        const rs = await auth.login(username, password)
        if (rs) {
            navigate(searchParams.get('redirect') as string)
            return
        }
        alert('Username or password is incorrect!')
    }
    return (
        <div style={{
            height: '100dvh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Form
                name="normal_login"
                style={{
                    width: '300px',
                    maxWidth: '90%',
                }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input
                        data-testid="username"
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Username" />
                </Form.Item>
                <Form.Item

                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                        data-testid="password"
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Button data-testid="btnLogin" type="primary" htmlType="submit" className="login-form-button" style={{ width: '100%' }}>
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </div>

    )
}