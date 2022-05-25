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
            const newTheme = state.theme.mode === 'light' ? 'dark' : 'light';
            state.theme.mode = newTheme;
        },
        toggleBlueMode(state) {
            const newTheme = state.theme.mode === 'light' ? 'blue' : 'light';
            state.theme.mode = newTheme;
        },
    },
});

export const { toggleDarkMode, toggleBlueMode } = slice.actions;

export default slice.reducer;
