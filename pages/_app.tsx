import * as React from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { useSelector } from 'react-redux';
import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import theme from 'src/theme';
import { wrapper } from 'store';
import { getTheme } from 'store/selectors/ui';

import createEmotionCache from '../src/createEmotionCache';

// Client-side cache, shared for the whole session of the user in the browser.

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

const rtlClientSideEmotionCache = createEmotionCache(true);
const clientSideEmotionCache = createEmotionCache(false);
function MyApp(props: MyAppProps) {
    const { locale } = useRouter();
    const { mode } = useSelector(getTheme);
    const [queryClient] = React.useState(() => new QueryClient());
    const isRtl = locale === 'fa';
    const {
        Component,
        emotionCache = isRtl ? rtlClientSideEmotionCache : clientSideEmotionCache,
        pageProps,
    } = props;

    const motionCache = React.useMemo(() => createEmotionCache(isRtl), [isRtl]);
    React.useLayoutEffect(() => {
        document.body.dir = isRtl ? 'rtl' : 'ltr';
    }, [isRtl]);
    const memoizedTheme = React.useMemo(() => {
        return {
            ...theme[mode as 'light' | 'dark'],
            direction: isRtl ? 'rtl' : 'ltr',
        };
    }, [isRtl, mode]);
    return (
        <CacheProvider value={motionCache}>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <ThemeProvider theme={memoizedTheme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
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
