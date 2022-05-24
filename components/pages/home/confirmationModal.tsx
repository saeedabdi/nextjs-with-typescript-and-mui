import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { Input } from 'components/common';
import { useTranslation } from 'hooks/useTranslation';

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '9px',
};

interface ConfirmationModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function ConfirmationModal({ onClose, onConfirm, open }: ConfirmationModalProps) {
    const { t } = useTranslation();
    const [value, setValue] = React.useState('');
    return (
        <div>
            <Modal open={open} onClose={onClose}>
                <Box sx={style}>
                    <Typography variant="h6" component="h2">
                        {t('Are you sure?')}
                    </Typography>
                    <Typography fontSize={14} sx={{ my: 2 }}>
                        {`${t('For delete social')} ${t('please fill')} "${t('Confirm')}"`}
                    </Typography>
                    <Input
                        sx={{
                            width: '100%',
                        }}
                        name="confirm"
                        label={t('Confirm')}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder={t('Confirm')}
                    />
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                        <Button variant="outlined" size="small" color="primary" onClick={onClose}>
                            {t('Cancel')}
                        </Button>
                        <Button
                            variant="contained"
                            size="small"
                            disabled={value !== t('Confirm')}
                            color="primary"
                            onClick={onConfirm}
                        >
                            {t('Confirm')}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
