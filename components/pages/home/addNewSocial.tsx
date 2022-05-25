import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import AddIcon from '@mui/icons-material/Add';
import { Accordion, AccordionDetails, AccordionSummary, Alert, Box, Button } from '@mui/material';
import gate from 'gate';
import { useTranslation } from 'hooks/useTranslation';

import SocialForm from './socialFom';

function AddNewSocial() {
    const { t } = useTranslation();
    const [expand, setExpand] = useState(false);
    const cache = useQueryClient();
    const addNewSocial = useMutation(gate.addUserSocial, {
        onSuccess: () => {
            cache.invalidateQueries('userDetails');
            setExpand(false);
        },
    });

    return (
        <>
            {addNewSocial.error && (addNewSocial.error as any).data?.message && (
                <Alert onClick={addNewSocial.reset} variant="filled" severity="error">
                    {(addNewSocial.error as any).data.message}
                </Alert>
            )}
            <Accordion
                expanded={expand}
                sx={{
                    marginTop: '16px',
                    border: 'none',
                    boxShadow: 'none',
                }}
                onChange={() => ({})}
            >
                <AccordionSummary>
                    <Box>
                        <Button
                            variant="text"
                            size="small"
                            sx={{
                                margin: '16px 0',
                            }}
                            disabled={expand}
                            onClick={() => setExpand(true)}
                            color="primary"
                        >
                            <AddIcon
                                sx={{
                                    marginRight: '8px',
                                }}
                            />
                            {t('Add social')}
                        </Button>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    {expand && (
                        <SocialForm
                            onCancel={() => setExpand(false)}
                            onSubmit={(data) =>
                                addNewSocial.mutate({
                                    ...data,
                                    id: Math.random().toString(36),
                                })
                            }
                            title={t('Add new social')}
                        />
                    )}
                </AccordionDetails>
            </Accordion>
        </>
    );
}

export default AddNewSocial;
