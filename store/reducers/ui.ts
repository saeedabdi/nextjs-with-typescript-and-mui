import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'theme',

    initialState: {
        theme: {
            mode: 'light' as 'light' | 'dark',
        },
    },
    reducers: {
        toggleDarkMode(state) {
            state.theme.mode = state.theme.mode === 'light' ? 'dark' : 'light';
        },
    },
});

export const { toggleDarkMode } = slice.actions;

export default slice.reducer;
