import { AppBar,  Box,  Button, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useStore } from '../stores/defaultStore';
import { observer } from 'mobx-react-lite';
import agent from '../API/agent';
export default observer ( function NavBar() {

    const { userStore } = useStore();
    const handleOnClick = async () => {
        try {
            userStore.setLoading(true);
            await agent.Auth.logout(userStore.getUser().email);
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("user");
            userStore.setLoggedIn(false);
            userStore.setToken(null);
            userStore.setUser(null);
        }
        catch (error) {
            console.log("error while logging out", error);
        }
        finally {
            userStore.setLoading(false);
        }
    }

    return (
        <>
            <AppBar position="fixed" className="navBar">
                <Toolbar sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", bgcolor:"primary.main" }}>

                    <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" gap="20px">
                            <Box>
                                <Link to='/'>
                                <img src="/assets/logo.png" style={{
                                    height: "50px", width: "auto" }} alt="logo" />
                                </Link>
                            </Box>
                            <Box> 
                                <Typography className="navLink" variant="h6" component="a" href="/">Products</Typography>
                        </Box>
                        {userStore.getUser()?.role=="Admin" && (
                            <Box>
                                <Link to='/product/Modify'>
                                    <Button className="navLink" variant="contained">Add Product</Button>
                                </Link>
                            </Box>
                        )}
                        </Box>
                    <Box>
                        <Box display="flex" flexDirection="row" gap="20px" justifyContent="center" alignItems="center">
                            {userStore.getUser() ? (
                                <>
                                    <Typography className="navLink" variant="subtitle1" component="a" href="/profile">
                                        Profile
                                    </Typography>
                                    <Button onClick={handleOnClick} className="navLink" variant="contained">
                                        Logout
                                    </Button>
                                </>
                            ): (
                                <>
                                    <Typography className="navLink" variant="subtitle1" component="a" href="/login">
                                        Login
                                    </Typography>
                                        <Link to='/register'>
                                            <Button variant="contained">
                                            Register
                                        </Button>
                                    </Link>
                                </>
                            )}
                            
                            
                            </Box>
                        </Box>
                    
                </Toolbar>
            </AppBar>
        </>
    )
})
    