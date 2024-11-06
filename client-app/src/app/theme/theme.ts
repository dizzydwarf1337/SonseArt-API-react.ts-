import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#4D6956', 
            contrastText: '#FCF5E3', 
        },
        secondary: {
            main: '#f8edd0',
            contrastText:"#234d20"
        },
        success: {
            main: "#B4DDA3",
            contrastText: "#FFFFF"
        },
        background: {
            default: '#F8EDD0', 
        },
    },
    typography: {
        fontFamily: 'Arial, sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 600,
            color: '#2e7d32',
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 500,
            color: '#2e7d32',
        },
        body1: {
            fontSize: '1rem',
            color: '#4a4a4a',
        },
    },
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    textDecoration: 'none',
                    color: '#FCF5E3',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: 8,
                    boxShadow: "0px 0px 5px 3px #F8EAC6",
                },
                containedPrimary: {
                    backgroundColor: 'primary',
                    '&:hover': {
                        backgroundColor: '#FCF5E3',
                        color: "#221420",
                        transition: "0.5s"
                    },
                },
                containedSuccess: {
                    backgroundColor: 'success',
                    boxShadow: "none",
                    '&:hover': {
                        backgroundColor: '#CEFDBA',
                        transition: "0.5s"
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                colorPrimary: {
                    backgroundColor: '#2e7d32',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: '#f5f5dc',
                    boxShadow: 'none',
                    border: '1px solid #ccc', 
                },
            },
        },
    },
});

export default theme;