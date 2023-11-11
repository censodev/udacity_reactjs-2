import { Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { createQuestion } from "../slices/questSlice";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";
import { AppThunkDispatch } from "../store";

export default function QuestNew() {
    const dispatch = useDispatch<AppThunkDispatch>()
    const navigate = useNavigate()
    const auth = useAuth()
    async function onFinish({ optionOneText, optionTwoText }: { optionOneText: string, optionTwoText: string }) {
        const author = auth.user()?.id ?? ''
        await dispatch(createQuestion({ optionOneText, optionTwoText, author }))
        alert('Created!')
        navigate({ to: '/' })
    }
    return (
        <Form
            onFinish={onFinish}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '500px',
                margin: '0 auto',
            }}>
            <h3>Would you rather</h3>
            <p>Create your own poll</p>
            <div style={{
                display: 'flex',
                gap: '1.5rem',
                width: '100%',
            }}>
                <Form.Item
                    style={{ flexGrow: '1' }}
                    name="optionOneText"
                    rules={[{ required: true, message: 'Please input your 1st option!' }]}
                >
                    <Input placeholder="1st option"></Input>
                </Form.Item>
                <Form.Item
                    style={{ flexGrow: '1' }}
                    name="optionTwoText"
                    rules={[{ required: true, message: 'Please input your 2nd option!' }]}
                >
                    <Input placeholder="2nd option"></Input>
                </Form.Item>

            </div>
            <Form.Item style={{ width: '100%' }}>
                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>Submit</Button>
            </Form.Item>
        </Form>
    )
}