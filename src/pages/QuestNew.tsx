import { Button, Input } from "antd";
import Title from "antd/es/typography/Title";

export default function QuestNew() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '500px',
            margin: '0 auto',
        }}>
            <Title level={3}>Would you rather</Title>
            <p>Create your own poll</p>
            <div style={{
                display: 'flex',
                gap: '1.5rem',
                width: '100%',
            }}>
                <Input placeholder="1st option" style={{ flexGrow: '1' }}></Input>
                <Input placeholder="2nd option" style={{ flexGrow: '1' }}></Input>
            </div>
            <Button type="primary" style={{ width: '100%', marginTop: '1.5rem' }}>Submit</Button>
        </div>
    )
}