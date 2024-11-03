import { Box, Button, TextField, Typography } from "@mui/material";
import { useStore } from "../../app/stores/defaultStore";
import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import agent from "../../app/API/agent";
import { LoginModel } from "../../app/models/loginModel";
import { observer } from "mobx-react-lite";

export default observer ( function LoginForm() {

    const { userStore } = useStore();
    const navigate = useNavigate();
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
            userStore.token = response.token;
            const user = await agent.Users.getUserByEmail(loginModel.email);
            userStore.setUser(user);
            userStore.setLoggedIn(true);
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", response.token);
            navigate("/");
        } catch (error) {
            console.error("invalid login model", error);
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
        <Box display="flex" flexDirection="column" m="20px" alignItems="center" justifyContent="center"
            sx={{ bgcolor: "#727548", borderRadius: "20px", p:"50px 40px",m:"50px 40px", gap:"20px" }}
        >
        <Typography variant="h5" sx={{color:"#D4D8C5"}}>Login</Typography>
            <Form onSubmit={handleSubmit}>
                <Box>
                    <TextField
                        required
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="example@gmail.com"
                        sx={{ m: "20px", bgcolor:"#E9EBE1" }}
                        value={loginModel.email}
                        onChange={handleInputChange}
                       
                    />
                </Box>
                <Box borderRadius="20px">
                    <TextField
                        required
                        id="password"
                        name="password"
                        type="password"
                        label="Password"
                        sx={{ m: "20px", bgcolor: "#E9EBE1", textDecoration: "none", textDecorationColor:"black" }}
                        value={loginModel.password}
                        onChange={handleInputChange} 
                    />
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Button  variant="contained" type="submit" sx={{ borderRadius: "10px" }}>Submit</Button>
                </Box>
            </Form>
        </Box>
    );
})
