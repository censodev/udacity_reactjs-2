import { Button, Card } from "antd"
import { CSSProperties } from "react"
import { format } from 'date-fns'
import { useNavigate } from "@tanstack/react-router"
import { QuestModel } from "../types/models"

export default function Quest({ data, style }: { data: QuestModel, style?: CSSProperties }) {
    const navigate = useNavigate()
    return (
        <Card bordered={true} style={style}>
            <h3 style={{ margin: '0' }}>{data.author}</h3>
            <p>{format(data.timestamp, 'hh:mm aa | do MMM yyyy')}</p>
            <Button type={"primary"} style={{ width: '100%' }} onClick={() => navigate({ to: '/quest/$id', params: { id: data.id } })}>Show</Button>
        </Card>
    )
}