import { Box, Button, TextField, Typography, Divider, FormHelperText } from "@mui/material";

import { useStore } from "../../app/stores/defaultStore";
import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import agent from "../../app/API/agent";
import { LoginModel } from "../../app/models/loginModel";
import { observer } from "mobx-react-lite";

export default observer ( function LoginForm() {

    const { userStore } = useStore();
    const navigate = useNavigate();
    const [error,setError] = useState<string>("");
    const [loginModel, setLoginModel] = useState<LoginModel>({
        email: "",
        password: "",
        token: "",
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setLoginModel((prevModel) => ({
            ...prevModel,
            [name]: value
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            userStore.setLoading(true);
            const response: LoginModel = await agent.Auth.login(loginModel);
            if (response) {
                userStore.token = response.token;
                const user = await agent.Users.getUserByEmail(loginModel.email);
                userStore.setUser(user);
                userStore.setLoggedIn(true);
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("token", response.token);
                navigate("/");
            }
            else throw new Error;
        } catch (error) {
            console.error("invalid login data");
            setError("Invalid login data");
        }
        finally {
            userStore.setLoading(false);
        }
        
    };
    if (userStore.getLoggedIn()) return (
        <>
            <Typography variant="h5" sx={{ color: "#727548", m:"20px" }}>You are already logged in</Typography>
        </>
    )
    return (
        <Box width="100%" height="100%" display="flex" flexDirection="row" m="10px">
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center"
                sx={{bgcolor: "primary.main", borderRadius: "20px", p:"50px 40px",m:"50px 40px", gap:"20px" }}>
                <Typography variant="h5" sx={{color:"#D4D8C5"}}>Login</Typography>
                <Form onSubmit={handleSubmit}>
                    <Box>
                        <TextField
                            required
                            id="email"
                            name="email"
                            type="email"
                            placeholder="example@gmail.com"
                            sx={{ m: "20px", bgcolor: "#E9EBE1" }}
                            value={loginModel.email}
                            onChange={handleInputChange}
                        />
                    </Box>
                    <Box>
                        <TextField
                            required
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            sx={{ m: "20px", bgcolor: "#E9EBE1", textDecoration: "none", textDecorationColor:"black" }}
                            value={loginModel.password}
                            onChange={handleInputChange}
                        />
                    </Box>
                    <Box m="0px 22px 10px 22px" >
                        <FormHelperText id="component-error-text" sx={{ color: "White" }}>{error}</FormHelperText>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Button variant="contained" color="success" type="submit" sx={{ borderRadius: "10px" }}>Submit</Button>
                    </Box>
                </Form>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box display="flex" flexDirection="column" m="20px" alignItems="center" justifyContent="center"
                sx={{ bgcolor: "primary.main", borderRadius: "20px", p: "50px 40px", m: "50px 40px", gap: "20px" }}>

            </Box>

        </Box>
    );
})
