import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { DarkModeSwitch } from 'components/common';
import { useTranslation } from 'hooks/useTranslation';
import { toggleDarkMode } from 'store/reducers/ui';
import { getTheme } from 'store/selectors/ui';

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

export default function Breadcrumb() {
    const { mode } = useSelector(getTheme);
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/" onClick={handleClick}>
            {t('Home')}
        </Link>,
        <Link underline="hover" key="2" color="inherit" href="/user" onClick={handleClick}>
            {t('User')}
        </Link>,
        <Typography key="3" color="text.primary">
            {t('User settings')}
        </Typography>,
    ];

    return (
        <Box
            sx={{
                display: 'flex',

                justifyContent: 'space-between',
            }}
            py={2}
        >
            <Breadcrumbs separator="." aria-label="breadcrumb">
                {breadcrumbs}
            </Breadcrumbs>
            <Box>
                <DarkModeSwitch
                    style={{ marginBottom: '2rem' }}
                    checked={mode === 'dark'}
                    onChange={() => dispatch(toggleDarkMode())}
                    moonColor="#ff8927"
                    size={30}
                />
            </Box>
        </Box>
    );
}
