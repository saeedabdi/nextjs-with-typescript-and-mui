import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

export const getDesignTokens = (mode: 'light' | 'dark', direction: 'rtl' | 'ltr') => ({
    palette: {
        mode: mode,
        direction,
        primary: {
            main: 'rgb(255, 168, 46)',
        },
        secondary: {
            main: '#19857b',
        },

        error: {
            main: red.A400,
        },
    },
});

export default createTheme(getDesignTokens('dark', 'rtl'));
// export const ltrLightTheme = createTheme(getDesignTokens('dark', 'ltr'));
