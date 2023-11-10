import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { QuestModel, UserModel } from "../types/models";
import { _getQuestions, _getUsers, _saveQuestion, _saveQuestionAnswer } from "../../_DATA";

export const fetchQuestions = createAsyncThunk("quest/fetchQuestions", async () => {
    const response = await (_getQuestions() as Promise<{ [key: string]: QuestModel }>);
    return Object.values(response);
});

export const createQuestion = createAsyncThunk("quest/createQuestion", async (quest: { optionOneText: string, optionTwoText: string, author: string }) => {
    return await (_saveQuestion(quest) as Promise<QuestModel>)
})

export const saveQuestionAnswer = createAsyncThunk("quest/saveQuestionAnswer", async (qa: {
    authedUser: string,
    qid: string,
    answer: number,
}) => {
    await (_saveQuestionAnswer({ ...qa, answer: qa.answer === 1 ? 'optionOne' : 'optionTwo' }) as Promise<void>)
    return qa
})

export const fetchUsers = createAsyncThunk("quest/fetchUsers", async () => {
    const response = await (_getUsers() as Promise<{ [key: string]: UserModel }>);
    return Object.values(response);
});

const initialState: {
    questions: QuestModel[],
    fetchPending: boolean,
    users: UserModel[],
    fetchUserPending: boolean,
} = {
    questions: [],
    fetchPending: false,
    users: [],
    fetchUserPending: false,
}


const questSlice = createSlice({
    name: 'quest',
    initialState,
    reducers: {
        create: (state, action: PayloadAction<QuestModel>) => {
            state.questions.push(action.payload)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuestions.pending, (state) => {
                state.fetchPending = true;
            })
            .addCase(fetchQuestions.fulfilled, (state, action) => {
                state.questions = action.payload
                    .sort((q1, q2) => q2.timestamp - q1.timestamp);
                state.fetchPending = false;
            })
            .addCase(createQuestion.fulfilled, (state, action) => {
                console.log(action.payload);
                state.questions = [...state.questions, action.payload];
                state.users.forEach(u => {
                    if (u.id === action.payload.author) {
                        u.questions.push(action.payload.id)
                    }
                })
            })
            .addCase(saveQuestionAnswer.fulfilled, (state, action) => {
                console.log(action.payload);
                state.questions.forEach(q => {
                    if (q.id === action.payload.qid) {
                        if (1 === action.payload.answer) {
                            q.optionOne.votes.push(action.payload.authedUser)
                        }
                        if (2 === action.payload.answer) {
                            q.optionTwo.votes.push(action.payload.authedUser)
                        }
                    }
                });
                state.users.forEach(u => {
                    if (u.id === action.payload.authedUser) {
                        u.answers[action.payload.qid] = 1 === action.payload.answer ? 'optionOne' : 'optionTwo'
                    }
                })
            })
            .addCase(fetchUsers.pending, (state) => {
                state.fetchUserPending = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload
                state.fetchUserPending = false;
            })
    },
})

export const { create } = questSlice.actions;

export default questSlice.reducer;