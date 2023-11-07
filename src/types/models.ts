export type UserModel = {
    id: string
    password: string
    name: string
    avatarURL: string | null
    answers: { [key: string]: string }
    questions: string[]
}

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
    voted: boolean
}