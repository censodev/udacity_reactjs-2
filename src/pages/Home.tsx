import { useSelector } from "react-redux";
import QuestGroup from "../components/QuestGroup";
import { RootState } from "../store";

export default function Home() {
    const questions = useSelector((state: RootState) => state.quest.questions)
    return (
        <div>
            <QuestGroup style={{ margin: '1rem auto', width: '80%' }} name="New Questions" questions={questions}></QuestGroup>
            <QuestGroup style={{ margin: '1rem auto', width: '80%' }} name="Done" questions={questions}></QuestGroup>
        </div>
    )
}