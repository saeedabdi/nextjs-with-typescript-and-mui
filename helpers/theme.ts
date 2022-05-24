import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

export const getDesignTokens = (mode: 'light' | 'dark') => ({
    typography: {
        fontFamily: ['Poppins', 'Vazir'].join(','),
    },
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
const blue = createTheme({
    ...getDesignTokens('light'),
    palette: {
        ...dark.palette,
        primary: {
            main: '#19857b',
        },
        secondary: {
            main: '#ff8927',
        },
        background: {
            default: 'rgb(0, 30, 60);',
            paper: 'rgb(0, 30, 60);',
        },
    },
});
const light = createTheme(getDesignTokens('light'));
export default {
    light,
    dark,
    blue,
};
