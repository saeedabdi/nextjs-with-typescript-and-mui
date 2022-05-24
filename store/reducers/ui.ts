import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'theme',

    initialState: {
        theme: {
            mode: 'light' as 'light' | 'dark' | 'blue',
        },
    },
    reducers: {
        toggleDarkMode(state) {
            state.theme.mode = state.theme.mode === 'light' ? 'dark' : 'light';
        },
        toggleBlueMode(state) {
            state.theme.mode = state.theme.mode === 'light' ? 'blue' : 'light';
        },
    },
});

export const { toggleDarkMode, toggleBlueMode } = slice.actions;

export default slice.reducer;
