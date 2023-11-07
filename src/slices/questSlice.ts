import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { QuestModel } from "../types/models";
import { _getQuestions, _saveQuestion } from "../../_DATA";

export const fetchQuestions = createAsyncThunk("quest/fetchQuestions", async () => {
    const response = await (_getQuestions() as Promise<{ [key: string]: QuestModel }>);
    return Object.values(response);
});

export const createQuestion = createAsyncThunk("quest/createQuestion", async (quest: { optionOneText: string, optionTwoText: string, author: string }) => {
    return await (_saveQuestion(quest) as Promise<QuestModel>)
})

const initialState: { questions: QuestModel[] } = {
    questions: [],
}

const questSlice = createSlice({
    name: 'quest',
    initialState,
    reducers: {
        create: (state, action: PayloadAction<QuestModel>) => {
            state.questions.push(action.payload)
        },
        vote: (state, action: PayloadAction<{ questId: string, userId: string, option: number }>) => {
            state.questions = state.questions.map(quest => {
                if (action.payload.questId !== quest.id)
                    return quest
                if (1 === action.payload.option)
                    quest.optionOne.votes.push(action.payload.userId)
                if (2 === action.payload.option)
                    quest.optionTwo.votes.push(action.payload.userId)
                return quest
            })
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuestions.fulfilled, (state, action) => {
                state.questions = action.payload;
            })
            .addCase(createQuestion.fulfilled, (state, action) => {
                console.log(action.payload);
                state.questions = [...state.questions, action.payload];
            })
    },
})

export const { create, vote } = questSlice.actions;

export default questSlice.reducer;