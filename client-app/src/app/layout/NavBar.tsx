import { AppBar, Box, Button, CircularProgress, IconButton, Menu, MenuItem, MenuList, Toolbar, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../stores/defaultStore';
import { observer } from 'mobx-react-lite';
import agent from '../API/agent';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DefaultSnackBar from './DefaultSnackBar';
import CloseIcon from '@mui/icons-material/Close';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';

export default observer(function NavBar() {
    const { userStore,productStore } = useStore();
    const [openSnack, setOpenSnack] = useState(false);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleMenuOpen = (event) => {
            setAnchorEl(event.currentTarget)
    }
    const handleCloseMenu = () => {
        setAnchorEl(null);
    }

    const handleOnClick = async () => {
        try {
            userStore.setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 2000));
            await agent.Auth.logout(userStore.getUser().email);
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("user");
            userStore.setLoggedIn(false);
            userStore.setToken(null);
            userStore.setUser(null);
            setOpenSnack(true); 
        } catch (error) {
            console.log("Error while logging out", error);
        } finally {
            userStore.setLoading(false);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnack(false);
    };

    return (
        <>
            <AppBar position="fixed" className="navBar">
                <Toolbar sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", bgcolor: "primary.main" }}>
                    <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" gap="20px">
                        <Box>
                            <Link to='/'>
                                <img src="/assets/logo.png" style={{ height: "50px", width: "auto" }} alt="logo" />
                            </Link>
                        </Box>
                        <Box>
                            <Typography className="navLink" variant="h6" component="a" href="/">Products</Typography>
                        </Box>
                        {userStore.getUser()?.role === "Admin" && (
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
                                    <IconButton onClick={handleMenuOpen}>
                                        <FavoriteBorderIcon sx={{ color: "secondary.main", position: "relative" }} />
                                        {userStore.favProducts.length>0 ? (
                                            <Box
                                                sx={{
                                                    position: "absolute",
                                                    top: "50%",
                                                    right: 0,
                                                    borderRadius: "50%",
                                                    backgroundColor: "#F0386B",
                                                    width: 15,
                                                    height: 15,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    fontSize: "10px",
                                                    color: "white",
                                                    fontWeight: "bold"
                                                }}
                                            >
                                                {userStore.favProducts.length}
                                            </Box>
                                        ) : (null)}
                                    </IconButton>
                                    <IconButton sx={{color:"secondary.main"} }>
                                        <LocalMallOutlinedIcon />
                                    </IconButton>
                                    <LoadingButton
                                        onClick={handleOnClick}
                                        className="navLink"
                                        variant="contained"
                                        disabled={userStore.getLoading()}
                                        startIcon={userStore.getLoading() ? <CircularProgress size={16} /> : null}
                                    >
                                        Logout
                                    </LoadingButton>
                                </>
                            ) : (
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

            <DefaultSnackBar
                open={openSnack}
                onClose={handleCloseSnackbar}
                message="You have successfully logged out"
                severity="success"
            />
            <Menu open={open} onClose={handleCloseMenu} anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center'}}
                transformOrigin={{ vertical: 'top', horizontal: 'center'}}
            >
                {userStore.favProducts.length===0 ?(<Typography variant="h6" color="primary.main" p="5px">No favourite products</Typography>) : (
                <Box>
                <MenuList sx={{ width: "100%", height: "100%", p:"0px"}}>
                    <Typography variant="h6" sx={{ textAlign: "center", color: "primary.main", mb:"10px"}}>Favourite Products</Typography>
                    {userStore.favProducts.map((product) => (
                        <MenuItem sx={{ borderRadius: "1px", border: "solid black", borderWidth: "0.5px 0px 0px 0px", width:"275px"}} key={product.id}
                            onClick={() => { navigate(`/product/${product.id}`); productStore.setSelectedProduct(product); }}
                        >
                        <Box display="flex" flexDirection="row" alignItems="center" gap="10px" >
                            <Box display="flex" borderRadius="50%" >
                                    <img src={`/public/${product.image}`} width="50px" height="50px" style={{ borderRadius: "50%", imageResolution: "from-image", objectFit:"cover" }}/>
                            </Box>
                            <Box display="flex" flexDirection="column">
                                <Typography color="primary.main" variant="subtitle1">{product.name}</Typography>
                                <Typography color="primary.main" variant="subtitle2">{product.price}</Typography>
                                </Box>
                                <Box position="absolute" right="0px" top="15px">
                                    <IconButton onClick={(e) => { e.stopPropagation(); userStore.removeFavProduct(product); }} sx={{
                                    zIndex: "200",

                                }}>
                                    <CloseIcon sx={{ color: "red" }} />
                                </IconButton>
                            </Box>
                        </Box>
                </MenuItem>
                    ))}
                        </MenuList>
                        <Box alignItems="center" justifyContent="center" display="flex" pt="10px" width="100%" sx={{ border:"solid black",borderWidth: "1px 0px 0px 0px"}}>
                            <Button variant="contained" color="warning" onClick={() => { userStore.setFavProducts([]); }}>Delete All</Button>
                        </Box>
                </Box>
                )}
            </Menu>
  
        </>
    );
});
