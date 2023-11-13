import { Card } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { AppThunkDispatch, RootState } from "../store"
import { saveQuestionAnswer } from "../slices/questSlice"
import useAuth from "../hooks/useAuth"

export default function QuestDetail() {
    const dispatch = useDispatch<AppThunkDispatch>()
    const auth = useAuth()
    const uid = auth.user()?.id ?? ''
    const pathSegments = window.location.pathname.split('/')
    const id = pathSegments[pathSegments.length - 1]
    const questions = useSelector((state: RootState) => state.quest.questions)
    const data = questions.find(q => q.id === id)
    async function onVote(opt: number) {
        await dispatch(saveQuestionAnswer({ qid: id, authedUser: uid, answer: opt }))
        alert('Voted!')
    }

    return (
        <div data-testid="questdetail"
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
            <h3>Poll by {data?.author}</h3>
            <p>Would you rather</p>
            <div style={{
                display: 'flex',
                gap: '1.5rem',
            }}>
                {[data?.optionOne, data?.optionTwo].map((opt, idx) => {
                    const voted1 = data?.optionOne.votes.includes(uid)
                    const voted2 = data?.optionTwo.votes.includes(uid)
                    const voted = voted1 || voted2
                    const currentOpt = 0 === idx ? data?.optionOne : data?.optionTwo
                    const votes = currentOpt?.votes.length ?? 0
                    const totalVotes = (data?.optionOne.votes.length ?? 0) + (data?.optionTwo.votes.length ?? 0)
                    const percentage = totalVotes ? (Math.round(votes / totalVotes * 100)) : 0
                    return <Card bordered={true} key={idx} style={{ flex: '1 0' }}>
                        <p style={{ width: '100%', textAlign: 'center', padding: '0 0.5rem' }}>{opt?.text}</p>
                        {voted
                            ? <Card.Grid style={{
                                width: '100%',
                                textAlign: 'center',
                                background: '#1677ff',
                                cursor: 'pointer',
                                color: 'white',
                                maxHeight: '1rem',
                                lineHeight: '0.25rem',
                            }}>
                                {voted1 && 0 === idx || voted2 && 1 === idx ? 'Your choice - ' : ''}
                                {votes} votes
                                ({percentage}%)
                            </Card.Grid>
                            : <Card.Grid style={{
                                width: '100%',
                                textAlign: 'center',
                                background: '#1677ff',
                                cursor: 'pointer',
                                color: 'white',
                                maxHeight: '1rem',
                                lineHeight: '0.25rem',
                            }} onClick={() => onVote(idx + 1)}>
                                Vote
                            </Card.Grid>
                        }
                    </Card>
                })}
            </div>
        </div>
    )
}