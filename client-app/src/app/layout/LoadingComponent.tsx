import { CircularProgress, Box } from '@mui/material';

const LoadingComponent = () => {
    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9999
            }}
        >
            <CircularProgress sx={{ color:"#C9A63A"} } />
        </Box>
    );
};

export default LoadingComponent;
