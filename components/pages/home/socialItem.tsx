import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WebsiteIcon from '@mui/icons-material/Language';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Typography,
} from '@mui/material';
import Link from '@mui/material/Link';
import gate from 'gate';
import { useTranslation } from 'hooks/useTranslation';
import { SocialsEntity } from 'interfaces/api/user.interface';

import ConfirmationModal from './confirmationModal';
import SocialForm from './socialFom';

interface SocialFormProps {
    data: SocialsEntity;
}

function SocialItem({ data }: SocialFormProps) {
    const cache = useQueryClient();
    enum social {
        facebook = 'facebook',
        twitter = 'twitter',
        instagram = 'instagram',
        linkedin = 'linkedin',
        website = 'website',
    }
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [expand, setExpand] = useState(false);

    function renderIcon(social: social) {
        switch (social) {
            case 'facebook':
                return <FacebookIcon />;
            case 'twitter':
                return <TwitterIcon />;
            case 'instagram':
                return <InstagramIcon />;
            case 'linkedin':
                return <LinkedInIcon />;
            case 'website':
                return <WebsiteIcon />;
            default:
                return <></>;
        }
    }

    const deleteSocial = useMutation(gate.deleteUserSocial, {
        onSuccess: () => {
            cache.invalidateQueries('userDetails');
        },
    });

    const updateSocial = useMutation(gate.updateUserSocial, {
        onSuccess: () => {
            cache.invalidateQueries('userDetails');
        },
    });

    return (
        <>
            <Accordion
                expanded={expand}
                sx={{
                    marginTop: '16px',
                    border: 'none',
                }}
                onChange={() => ({})}
            >
                <AccordionSummary>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 150px',
                            gridGap: '0px 16px',
                            borderRadius: '16px',
                            marginBottom: '16px',
                            width: '100%',
                            backgroundColor: 'background.paper',
                            padding: '16px',
                            gridTemplateRows: 'auto',
                            gridTemplateAreas: `
                        "details actions"
                        "form form" 
                        `,
                        }}
                    >
                        <Box
                            sx={{
                                gridArea: 'details details details',
                                display: 'flex',
                                gap: '8px',
                                width: '100%',
                                alignItems: 'center',
                            }}
                        >
                            {renderIcon(data.social as social)}
                            <Typography>{data.social}</Typography>
                            <Typography>
                                {t('Link')}:
                                <Link
                                    color="primary"
                                    component="a"
                                    sx={{
                                        margin: '0px 8px',
                                    }}
                                    href={data.link}
                                    variant="body1"
                                    onClick={() => {
                                        console.info("I'm a button.");
                                    }}
                                >
                                    {data.link}
                                </Link>
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                width: '100%',
                            }}
                        >
                            <Button
                                size="small"
                                onClick={() => setExpand(!expand)}
                                variant="text"
                                sx={{
                                    gap: '8px',
                                }}
                                disabled={expand}
                                color="primary"
                            >
                                <EditIcon />
                                {t('Edit')}
                            </Button>
                            <Button
                                size="small"
                                onClick={() => {
                                    setOpen(true);
                                }}
                                sx={{
                                    gap: '8px',
                                }}
                                variant="text"
                                color="error"
                            >
                                <DeleteIcon />
                                {t('Delete')}
                            </Button>
                        </Box>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <SocialForm
                        onCancel={() => setExpand(false)}
                        data={data}
                        onSubmit={updateSocial.mutate}
                        title={t('Edit social')}
                    />
                </AccordionDetails>
            </Accordion>
            <ConfirmationModal
                open={open}
                onClose={() => setOpen(false)}
                onConfirm={() => {
                    deleteSocial.mutate(data.id);
                    setOpen(false);
                }}
            />
        </>
    );
}

export default SocialItem;
