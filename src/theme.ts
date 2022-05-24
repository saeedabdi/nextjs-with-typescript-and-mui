import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

export const getDesignTokens = (mode: 'light' | 'dark') => ({
    palette: {
        mode: mode,
        primary: {
            main: '#ff8927',
        },
        secondary: {
            main: '#19857b',
        },

        error: {
            main: red.A400,
        },
    },
});
const dark = createTheme(getDesignTokens('dark'));

const light = createTheme(getDesignTokens('light'));
export default {
    light,
    dark,
};
