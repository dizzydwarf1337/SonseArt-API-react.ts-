import './styles.css'
import { Paper } from '@mui/material';
import NavBar from './NavBar';
import { Outlet } from 'react-router-dom';

function App() {
  return (
      <>
          <NavBar />
          <Paper sx={{ mt: "100px", ml: "60px", mr: "60px", pt: "10px", backgroundColor: "#CBC9AD", borderRadius: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Outlet/>
          </Paper>
    </>
  )
}

export default App
