import React from 'react';
import { Snackbar, Alert, Slide, SlideProps } from '@mui/material';

interface CustomSnackbarProps {
    open: boolean;
    onClose: () => void;
    message: string;
    severity?: 'success' | 'error' | 'warning' | 'info';
    autoHideDuration?: number;
}

function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="up" />;
}

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
    open,
    onClose,
    message,
    severity = 'info',
    autoHideDuration = 5000
}) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={onClose}
            TransitionComponent={SlideTransition}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
            <Alert onClose={onClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default CustomSnackbar;
