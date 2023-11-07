import { useDispatch, useSelector } from "react-redux";
import QuestGroup from "../components/QuestGroup";
import { RootState } from "../store";
import { useEffect } from "react";
import { fetchQuestions } from "../slices/questSlice";
import { Spin } from "antd";

export default function Home() {
    const dispatch = useDispatch();
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
            <QuestGroup style={{ margin: '1rem auto', width: '80%' }} name="New Questions" questions={questions.filter(q => !q.voted)}></QuestGroup>
            <QuestGroup style={{ margin: '1rem auto', width: '80%' }} name="Done" questions={questions.filter(q => q.voted)}></QuestGroup>
        </div>
    )
}