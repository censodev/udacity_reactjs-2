import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { QuestModel } from "../types/models";
import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from "../../_DATA";

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

const initialState: {
    questions: QuestModel[],
    fetchPending: boolean,
} = {
    questions: [],
    fetchPending: false,
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
            })
    },
})

export const { create } = questSlice.actions;

export default questSlice.reducer;