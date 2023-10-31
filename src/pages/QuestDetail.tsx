export default function QuestDetail({ useLoader }) {
    const id = useLoader() as string
    return (
        <div>QuestDetail {id}</div>
    )
}