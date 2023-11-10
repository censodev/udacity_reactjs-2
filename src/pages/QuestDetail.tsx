import { Card } from "antd"
import Title from "antd/es/typography/Title"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store"
import { saveQuestionAnswer } from "../slices/questSlice"
import useAuth from "../hooks/useAuth"
import { useNavigate } from "@tanstack/react-router"

export default function QuestDetail() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const auth = useAuth()
    const pathSegments = window.location.pathname.split('/')
    const id = pathSegments[pathSegments.length - 1]
    const questions = useSelector((state: RootState) => state.quest.questions)
    const data = questions.find(q => q.id === id)
    async function onVote(opt: number) {
        await dispatch(saveQuestionAnswer({ qid: id, authedUser: auth.user()?.id, answer: opt }))
        alert('Voted!')
        navigate({ to: '/' })
    }

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
                {[data?.optionOne, data?.optionTwo].map((opt, idx) => (
                    <Card bordered={true} key={idx} style={{ flex: '1 0' }}>
                        <p style={{ width: '100%', textAlign: 'center', padding: '0 0.5rem' }}>{opt?.text}</p>
                        <Card.Grid style={{
                            width: '100%',
                            textAlign: 'center',
                            background: '#1677ff',
                            cursor: 'pointer',
                            color: 'white',
                            maxHeight: '1rem',
                            lineHeight: '0.25rem',
                        }} onClick={() => onVote(idx)}>
                            Vote
                        </Card.Grid>

                    </Card>
                ))}
            </div>
        </div>
    )
}