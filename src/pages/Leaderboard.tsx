import { Table } from "antd";
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
    const data = [
        {
            id: 'sarahedo',
            password: 'password123',
            name: 'Sarah Edo',
            avatarURL: null,
            answers: {
                "8xf0y6ziyjabvozdd253nd": 'optionOne',
                "6ni6ok3ym7mf1p33lnez": 'optionOne',
                "am8ehyc8byjqgar0jgpub9": 'optionTwo',
                "loxhs1bqm25b708cmbf3g": 'optionTwo'
            },
            questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
        },
        {
            id: 'tylermcginnis',
            password: 'abc321',
            name: 'Tyler McGinnis',
            avatarURL: null,
            answers: {
                "vthrdm985a262al8qx3do": 'optionOne',
                "xj352vofupe1dqz9emx13r": 'optionTwo',
            },
            questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
        },
        {
            id: 'mtsamis',
            password: 'xyz123',
            name: 'Mike Tsamis',
            avatarURL: null,
            answers: {
                "xj352vofupe1dqz9emx13r": 'optionOne',
                "vthrdm985a262al8qx3do": 'optionTwo',
                "6ni6ok3ym7mf1p33lnez": 'optionOne'
            },
            questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
        },
    ].map(i => {
        return {
            user: `${i.name} (${i.id})`,
            answers: Object.keys(i.answers).length,
            created: i.questions.length,
        }
    })
    return (
        <Table dataSource={data} columns={columns} style={{ marginTop: '1rem' }} pagination={{ hideOnSinglePage: true }} />
    )
}