import { Button, Card } from "antd"
import Title from "antd/es/typography/Title"
import { CSSProperties } from "react"
import { format } from 'date-fns'
import { useNavigate } from "@tanstack/react-router"

export type QuestModel = {
    id: string
    author: string
    timestamp: Date
    optionOne: {
        votes: string[]
        text: string
    },
    optionTwo: {
        votes: string[]
        text: string
    },
}

export default function Quest({ data, style }: { data: QuestModel, style?: CSSProperties }) {
    const navigator = useNavigate()
    return (
        <Card bordered={true} style={style}>
            <Title level={5} style={{ margin: '0' }}>{data.author}</Title>
            <p>{format(data.timestamp, 'hh:mm aa | do MMM yyyy')}</p>
            <Button type={"primary"} style={{ width: '100%' }} onClick={() => navigator({ to: '/quest/$id', params: { id: data.id } })}>Show</Button>
        </Card>
    )
}