import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { getTheme } from 'store/selectors/ui';

import theme from '../src/theme';

function useTheme() {
    const { locale } = useRouter();
    const { mode } = useSelector(getTheme);
    switch ([mode, locale].join('-')) {
        case 'dark-fa':
            console.log('🚀 ~ file: useTheme.tsx ~ line 9 ~ useTheme ~ locale', locale);

            return theme.rtlDarkTheme;

        case 'dark-en':
            console.log('🚀 ~ file: useTheme.tsx ~ line 15 ~ useTheme ~ locale', locale);
            return theme.ltrDarkTheme;
        case 'light-fa':
            return theme.rtlLightTheme;
        default:
            return theme.ltrLightTheme;
    }
}

export default useTheme;
