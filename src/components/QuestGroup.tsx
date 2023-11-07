import { Card } from "antd";
import { CSSProperties } from "react";
import Quest from "./Quest";
import { QuestModel } from "../types/models";

export default function QuestGroup({ name, questions, style }: { name: string, questions: QuestModel[], style?: CSSProperties }) {
    return (
        <Card title={name} bordered={true} style={style}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1.5rem' }}>
                {questions.map(q => <Quest key={q.id} data={q}></Quest>)}
            </div>
        </Card>
    )
}