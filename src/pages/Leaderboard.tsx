import { Spin, Table } from "antd";
import { fetchUsers } from "../slices/questSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppThunkDispatch, RootState } from "../store";
const columns = [
    {
        title: 'User',
        dataIndex: 'user',
        key: 'user',
    },
    {
        title: 'Answers',
        dataIndex: 'answers',
        key: 'answers',
    },
    {
        title: 'Created',
        dataIndex: 'created',
        key: 'created',
    },
];
export default function Leaderboard() {
    const dispatch = useDispatch<AppThunkDispatch>()
    const fetchPending = useSelector((state: RootState) => state.quest.fetchUserPending);
    const data = useSelector((state: RootState) => state.quest.users)
        .map(i => {
            return {
                user: `${i.name} (${i.id})`,
                answers: Object.keys(i.answers).length,
                created: i.questions.length,
                key: i.id,
            }
        })
        .sort((u1, u2) => u2.answers + u2.created - u1.answers - u1.created)
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);
    return (
        <Spin spinning={fetchPending}>
            <Table dataSource={data} columns={columns} style={{ marginTop: '1rem' }} pagination={{ hideOnSinglePage: true }} />

        </Spin>
    )
}