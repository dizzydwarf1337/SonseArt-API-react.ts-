import { Paper, ThemeProvider } from '@mui/material';
import NavBar from './NavBar';
import { Outlet } from 'react-router-dom';
import theme from '../theme/theme';

function App() {
  return (
      <>
          <ThemeProvider theme={theme}>
          <NavBar />
          <Paper sx={{ mt: "100px", ml: "60px", mr: "60px", pt: "10px", height:"auto",backgroundColor: "background.default", borderRadius: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Outlet/>
              </Paper>
       </ThemeProvider>
    </>
  )
}

export default App
