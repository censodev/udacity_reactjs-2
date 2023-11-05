import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { QuestModel } from "../types/models";

const initialState: { questions: QuestModel[] } = {
    questions: [],
}

const questSlice = createSlice({
    name: 'quest',
    initialState,
    reducers: {
        init: (state, action: PayloadAction<QuestModel[]>) => {
            state.questions = action.payload
        },
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
})

export const { init, create, vote } = questSlice.actions;

export default questSlice.reducer;