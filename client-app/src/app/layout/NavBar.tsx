import { AppBar,  Button, Grid, Toolbar, Typography } from '@mui/material';
import './styles.css';
import { Link } from 'react-router-dom';
export default function NavBar() {
    return (
        <>
            <AppBar position="fixed"  className="navBar">
                <Toolbar sx={{ paddingLeft: "30px", height: "100%", display: "flex", justifyContent: "space-between" }}>
                    <Grid container alignItems="center" alignContent="center" spacing={4}>
                        <Grid item marginTop="10px">
                            <Link to='/'>
                                <img src="/assets/logo.png" style={{ height: "50px", width: "auto" }} alt="logo" />
                            </Link>
                        </Grid>
                        <Grid item> 
                            <Typography className="navLink" variant="h6" component="a" href="#">Products</Typography>
                        </Grid>
                        <Grid item>
                            <Link to='/product/Modify'>
                            <Button className="navLink" sx={{ color: "#D4D8C5", boxShadow:"0px 0px 10px 5px #D4D8C5" }}>Add Product</Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </>
    )
}
    