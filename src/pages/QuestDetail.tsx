import { Card } from "antd"
import Title from "antd/es/typography/Title"
import { useSelector } from "react-redux"
import { RootState } from "../store"

export default function QuestDetail({ useLoader }) {
    const id = useLoader() as string
    const questions = useSelector((state: RootState) => state.quest.questions)
    const data = questions.find(q => q.id === id)
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <Title level={3}>Poll by {data?.author}</Title>
            <p>Would you rather</p>
            <div style={{
                display: 'flex',
                gap: '1.5rem',
            }}>
                {[data?.optionOne, data?.optionTwo].map(opt => (
                    <Card bordered={true} key={opt?.text} style={{ flex: '1 0' }}>
                        <p style={{ width: '100%', textAlign: 'center', padding: '0 0.5rem' }}>{opt?.text}</p>
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