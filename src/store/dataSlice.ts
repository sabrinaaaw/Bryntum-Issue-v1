import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DataState {
    events: any[];
    resources: any[];
    assignments: any[];
}

const initialState: DataState = {
    events: [],
    resources: [],
    assignments: [],
};

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setData(state, action: PayloadAction<DataState>) {
            state.events = action.payload.events;
            state.resources = action.payload.resources;
            state.assignments = action.payload.assignments;
        },
        updateData(state, action: PayloadAction<any>) {
            const updatedEvent = action.payload;
            const index = state.events.findIndex(event => event.id === updatedEvent.id);
            if (index !== -1) {
                state.events[index] = updatedEvent;
            }
        }
    },
});

export const { setData, updateData } = dataSlice.actions;
export default dataSlice.reducer;