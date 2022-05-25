/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { useMediaQuery } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import createEmotionCache from 'helpers/createEmotionCache';
import theme from 'helpers/theme';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { wrapper } from 'store';
import { toggleDarkMode } from 'store/reducers/ui';
import { getTheme } from 'store/selectors/ui';

import 'assets/styles/index.css';

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

const rtlClientSideEmotionCache = createEmotionCache(true);
const clientSideEmotionCache = createEmotionCache(false);
function MyApp(props: MyAppProps) {
    const { locale } = useRouter();
    const dispatch = useDispatch();
    const { mode } = useSelector(getTheme);
    const defaultTheme = useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light';
    const [queryClient] = React.useState(() => new QueryClient());

    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

    const memoizedEmotionCache = React.useMemo(() => {
        if (locale === 'fa') {
            return rtlClientSideEmotionCache;
        }
        if (locale === 'en') {
            return clientSideEmotionCache;
        }
        return emotionCache;
    }, [locale]);
    React.useLayoutEffect(() => {
        document.body.dir = locale === 'fa' ? 'rtl' : 'ltr';
    }, [locale]);
    React.useEffect(() => {
        if (mode !== defaultTheme) {
            dispatch(toggleDarkMode());
        }
    }, [defaultTheme]);

    const memoizedTheme = React.useMemo(() => {
        return {
            ...theme[mode as keyof typeof theme],
            direction: locale === 'fa' ? 'rtl' : 'ltr',
        };
    }, [locale, mode]);
    return (
        <CacheProvider value={memoizedEmotionCache}>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <ThemeProvider theme={memoizedTheme}>
                <CssBaseline />
                <QueryClientProvider client={queryClient}>
                    <Hydrate state={pageProps.dehydratedState}>
                        <Component {...pageProps} />
                    </Hydrate>
                </QueryClientProvider>
            </ThemeProvider>
        </CacheProvider>
    );
}

export default wrapper.withRedux(MyApp);
