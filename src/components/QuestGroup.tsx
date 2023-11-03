import { Card } from "antd";
import { CSSProperties } from "react";
import Quest, { QuestModel } from "./Quest";

export default function QuestGroup({ name, questions, style }: { name: string, questions: QuestModel[], style?: CSSProperties }) {
    return (
        <Card title={name} bordered={true} style={style}>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
                {questions.map(q => <Quest data={q} style={{flexBasis: '25%'}}></Quest>)}
            </div>
        </Card>
    )
}