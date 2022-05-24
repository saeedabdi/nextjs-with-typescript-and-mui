import * as React from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { Button, Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Breadcrumb, SocialItem } from 'components/pages';
import AddNewSocial from 'components/pages/home/addNewSocial';
import gate from 'gate';
import { useTranslation } from 'hooks/useTranslation';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { toggleBlueMode } from 'store/reducers/ui';

const Home: NextPage = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { isLoading, data } = useQuery('userDetails', gate.getUserDetails);
    const router = useRouter();

    function changeLang(lang: string) {
        router.push(
            '/',
            {
                slashes: true,
            },
            {
                locale: lang,
            },
        );
    }
    return (
        <Container maxWidth="md">
            <Box mt={10} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography component={'h6'}>{t('User settings')}</Typography>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Button onClick={() => changeLang('en')} variant="text" color="primary">
                        English
                    </Button>
                    <Button onClick={() => changeLang('fa')} variant="text" color="warning">
                        فارسی
                    </Button>
                </Box>
            </Box>
            <Breadcrumb />
            <Box mt={10}>
                <Button
                    sx={{
                        mb: 4,
                    }}
                    onClick={() => {
                        dispatch(toggleBlueMode());
                    }}
                    variant="outlined"
                    color="info"
                >
                    {t('Toggle Blue Theme')}
                </Button>
                <Paper
                    sx={{
                        borderRadius: '16px',
                        width: '100%',
                        padding: '24px',
                        height: '100%',
                    }}
                    elevation={3}
                >
                    <Typography fontWeight="400" fontSize={10}>
                        {t('Socials')}
                    </Typography>
                    <AddNewSocial />
                    {isLoading ? (
                        <Typography fontWeight="400" fontSize={10}>
                            {t('Loading')}
                        </Typography>
                    ) : (
                        data?.socials?.map((item) => {
                            return <SocialItem key={item.id} data={item} />;
                        })
                    )}
                </Paper>
            </Box>
        </Container>
    );
};

export default Home;
