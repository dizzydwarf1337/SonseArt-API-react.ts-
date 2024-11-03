import { AppBar,  Box,  Button, Toolbar, Typography } from '@mui/material';
import './styles.css';
import { Link } from 'react-router-dom';
import { useStore } from '../stores/defaultStore';
import { observer } from 'mobx-react-lite';
import agent from '../API/agent';
export default observer ( function NavBar() {

    const { userStore } = useStore();
    const handleOnClick = () => {
        agent.Auth.logout(userStore.getUser().email);
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("user");
        userStore.setLoggedIn(false);
        userStore.setToken(null);
        userStore.setUser(null);
    }

    return (
        <>
            <AppBar position="fixed" className="navBar">
                <Toolbar sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

                    <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" gap="20px">
                            <Box>
                                <Link to='/'>
                                <img src="/assets/logo.png" style={{
                                    height: "50px", width: "auto" }} alt="logo" />
                                </Link>
                            </Box>
                            <Box> 
                                <Typography className="navLink" variant="h6" component="a" href="">Products</Typography>
                        </Box>
                        {userStore.getUser()?.role=="Admin" && (
                            <Box>
                                <Link to='/product/Modify'>
                                    <Button className="navLink" sx={{ color: "#D4D8C5", boxShadow: "0px 0px 10px 5px #D4D8C5" }}>Add Product</Button>
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
                                    <Button onClick={handleOnClick} className="navLink" sx={{ color: "#D4D8C5", boxShadow: "0px 0px 10px 5px #D4D8C5" }}>
                                        Logout
                                    </Button>
                                </>
                            ): (
                                <>
                                    <Typography className="navLink" variant="subtitle1" component="a" href="/login">
                                        Login
                                    </Typography>
                                    <Link to='/register'>
                                        <Button className="navLink" sx={{ color: "#D4D8C5", boxShadow: "0px 0px 10px 5px #D4D8C5" }}>
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
    