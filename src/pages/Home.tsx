import { QuestModel } from "../components/Quest";
import QuestGroup from "../components/QuestGroup";

export default function Home() {
    const questions: QuestModel[] = [
        {
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
        },
        {
            id: '6ni6ok3ym7mf1p33lnez',
            author: 'mtsamis',
            timestamp: new Date(1468479767190),
            optionOne: {
                votes: [],
                text: 'hire more frontend developers',
            },
            optionTwo: {
                votes: ['mtsamis', 'sarahedo'],
                text: 'hire more backend developers'
            }
        },
        {
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
        },
        {
            id: '6ni6ok3ym7mf1p33lnez',
            author: 'mtsamis',
            timestamp: new Date(1468479767190),
            optionOne: {
                votes: [],
                text: 'hire more frontend developers',
            },
            optionTwo: {
                votes: ['mtsamis', 'sarahedo'],
                text: 'hire more backend developers'
            }
        },
    ]
    return (
        <div>
            <QuestGroup style={{ margin: '1rem auto', width: '80%' }} name="New Questions" questions={questions}></QuestGroup>
            <QuestGroup style={{ margin: '1rem auto', width: '80%' }} name="Done" questions={questions}></QuestGroup>
        </div>
    )
}