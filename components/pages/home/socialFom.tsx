import { useForm, useWatch } from 'react-hook-form';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WebIcon from '@mui/icons-material/Language';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Box, Button, Typography } from '@mui/material';
import { Input } from 'components/common';
import Select from 'components/common/select';
import { capitalize } from 'helpers/capitalaize';
import { useTranslation } from 'hooks/useTranslation';
import { useYupValidationResolver } from 'hooks/useYupValidationResolver';
import { SocialsEntity } from 'interfaces/api/user.interface';
import * as yup from 'yup';

interface SocialFormProps {
    title: string;
    data?: SocialsEntity;
    onCancel: () => void;
    onSubmit: (data: SocialsEntity) => void;
}
function SocialForm({ data, title, onSubmit, onCancel }: SocialFormProps) {
    const { t } = useTranslation();
    const schema = yup.object().shape({
        social: yup.string().required(t("Social's name is required")),
        link: yup.string().url(t("This isn't a valid URL")).required(t("This isn't a valid URL")),
    });
    const resolver = useYupValidationResolver(schema);
    const {
        control,
        reset,
        setValue,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<SocialsEntity>({
        resolver,
        defaultValues: data,
        mode: 'all',
    });

    const { social, link } = useWatch({
        control,
    });
    const socials = [
        {
            value: '',
            label: t('Select social'),
            icon: <></>,
        },
        {
            value: 'facebook',
            label: t('Facebook'),
            icon: <FacebookIcon />,
        },
        {
            value: 'twitter',
            label: t('Twitter'),
            icon: <TwitterIcon />,
        },
        {
            value: 'instagram',
            label: t('Instagram'),
            icon: <InstagramIcon />,
        },
        {
            value: 'linkedin',
            label: t('Linkedin'),
            icon: <LinkedInIcon />,
        },
        {
            value: 'web',
            label: t('Web'),
            icon: <WebIcon />,
        },
    ];
    return (
        <Box>
            <Typography component={'h6'}>
                {title}
                <Typography textTransform="capitalize" mx={1} component={'span'}>
                    {t(capitalize(social || ''))}
                </Typography>
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    gap: '8px',
                    mt: 3,
                    justifyContent: 'space-between',
                    '@media (max-width: 768px)': {
                        flexDirection: 'column',
                    },
                }}
            >
                <Select
                    wrapperSx={{
                        width: '100%',
                    }}
                    disabled={!!data}
                    name="social"
                    control={control}
                    error={!!errors.social?.message}
                    helperText={errors.social?.message}
                    label={t('Social')}
                    color={errors.social?.message ? 'error' : 'primary'}
                    options={socials}
                />
                <Input
                    sx={{
                        width: '100%',
                    }}
                    helperText={errors.link?.message}
                    label={t('Link')}
                    color={errors.link?.message ? 'error' : 'primary'}
                    name="link"
                    control={control}
                />
            </Box>
            <Box
                mt={2}
                sx={{
                    display: 'flex',
                    gap: '8px',
                    justifyContent: 'flex-end',
                    flexDirection: 'row',
                }}
            >
                <Button
                    onClick={() => {
                        reset(data);
                        onCancel();
                    }}
                    variant="outlined"
                    color="primary"
                >
                    {t('Cancel')}
                </Button>
                <Button
                    type="submit"
                    onClick={handleSubmit((d) => onSubmit(d as SocialsEntity))}
                    disabled={!isValid}
                    variant="contained"
                    color="primary"
                >
                    {t('Save')}
                </Button>
            </Box>
        </Box>
    );
}

export default SocialForm;
