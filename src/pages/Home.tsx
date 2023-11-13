import { useDispatch, useSelector } from "react-redux";
import QuestGroup from "../components/QuestGroup";
import { AppThunkDispatch, RootState } from "../store";
import { useEffect, useState } from "react";
import { fetchQuestions } from "../slices/questSlice";
import { Spin, Tabs, TabsProps } from "antd";
import useAuth from "../hooks/useAuth";

const items: TabsProps['items'] = [
    {
        label: 'Unanswered',
        key: 'unanswered',
    },
    {
        label: 'Answered',
        key: 'answered',
    },
];

export default function Home() {
    const dispatch = useDispatch<AppThunkDispatch>();
    const auth = useAuth()
    const uid = auth.user()?.id ?? ''
    const questions = useSelector((state: RootState) => state.quest.questions)
    const fetchPending = useSelector((state: RootState) => state.quest.fetchPending);
    const [tab, setTab] = useState<string>('unanswered');
    useEffect(() => {
        dispatch(fetchQuestions());
    }, [dispatch]);
    return (
        <Spin spinning={fetchPending}>
            <input data-testid="home" hidden></input>
            <Tabs style={{
                flexGrow: '1'
            }} centered onChange={e => setTab(e)} items={items} />
            {tab === 'unanswered'
                ? <QuestGroup style={{ margin: '1rem auto', width: '80%' }} questions={questions.filter(q => !q.optionOne.votes.includes(uid) && !q.optionTwo.votes.includes(uid))}></QuestGroup>
                : <QuestGroup style={{ margin: '1rem auto', width: '80%' }} questions={questions.filter(q => q.optionOne.votes.includes(uid) || q.optionTwo.votes.includes(uid))}></QuestGroup>
            }
        </Spin>
    )
}