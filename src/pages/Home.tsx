import { useDispatch, useSelector } from "react-redux";
import QuestGroup from "../components/QuestGroup";
import { RootState } from "../store";
import { useEffect } from "react";
import { fetchQuestions } from "../slices/questSlice";
import { Spin } from "antd";
import useAuth from "../hooks/useAuth";

export default function Home() {
    const dispatch = useDispatch();
    const auth = useAuth()
    const uid = auth.user()?.id ?? ''
    const questions = useSelector((state: RootState) => state.quest.questions)
    const fetchPending = useSelector((state: RootState) => state.quest.fetchPending);
    useEffect(() => {
        dispatch(fetchQuestions());
    }, [dispatch]);
    if (fetchPending) {
        return <Spin size="large" style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />;
    }
    return (
        <div>
            <QuestGroup style={{ margin: '1rem auto', width: '80%' }} name="New Questions" questions={questions.filter(q => !q.optionOne.votes.includes(uid) && !q.optionTwo.votes.includes(uid))}></QuestGroup>
            <QuestGroup style={{ margin: '1rem auto', width: '80%' }} name="Done" questions={questions.filter(q => q.optionOne.votes.includes(uid) || q.optionTwo.votes.includes(uid))}></QuestGroup>
        </div>
    )
}