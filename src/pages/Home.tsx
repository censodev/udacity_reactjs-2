import { useDispatch, useSelector } from "react-redux";
import QuestGroup from "../components/QuestGroup";
import { RootState } from "../store";
import { useEffect } from "react";
import { fetchQuestions } from "../slices/questSlice";

export default function Home() {
    const dispatch = useDispatch();
    const questions = useSelector((state: RootState) => state.quest.questions)
    useEffect(() => {
        dispatch(fetchQuestions());
    }, [dispatch]);
    return (
        <div>
            <QuestGroup style={{ margin: '1rem auto', width: '80%' }} name="New Questions" questions={questions.filter(q => !q.voted)}></QuestGroup>
            <QuestGroup style={{ margin: '1rem auto', width: '80%' }} name="Done" questions={questions.filter(q => q.voted)}></QuestGroup>
        </div>
    )
}