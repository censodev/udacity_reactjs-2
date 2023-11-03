import { Card } from "antd"
import Title from "antd/es/typography/Title"

export default function QuestDetail({ useLoader }) {
    const id = useLoader() as string
    const data = {
        id: '8xf0y6ziyjabvozdd253nd',
        author: 'sarahedo',
        timestamp: new Date(1467166872634),
        optionOne: {
            votes: ['sarahedo'],
            text: 'Build our new application with Javascript',
        },
        optionTwo: {
            votes: [],
            text: 'Build our new application with Typescript'
        }
    }
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <Title level={3}>Poll by {data.author}</Title>
            <p>Would you rather</p>
            <div style={{
                display: 'flex',
                gap: '1.5rem',
            }}>
                {[data.optionOne, data.optionTwo].map(opt => (
                    <Card bordered={true}>
                        <Card.Grid style={{
                            width: '100%',
                            textAlign: 'center',
                        }} hoverable={false}>{opt.text}</Card.Grid>
                        <Card.Grid style={{
                            width: '100%',
                            textAlign: 'center',
                            background: '#1677ff',
                            cursor: 'pointer',
                            color: 'white',
                            maxHeight: '1rem',
                            lineHeight: '0.25rem',
                        }}>
                            Vote
                        </Card.Grid>

                    </Card>
                ))}
            </div>
        </div>
    )
}