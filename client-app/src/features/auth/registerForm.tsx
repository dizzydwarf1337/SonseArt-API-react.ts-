import { useState } from "react"
import { User } from "../../app/models/user"
import { Box, TextField, Typography, Button, Divider } from "@mui/material";
import { Form, useNavigate } from "react-router-dom";
import agent from "../../app/API/agent";
import { LoginModel } from "../../app/models/loginModel";
import { useStore } from "../../app/stores/defaultStore";
export default function registerForm() {

    const { userStore } = useStore();
    const navigate = useNavigate();
    const [user, setUser] = useState<User>({
        id: "00000000-0000-0000-0000-000000000000",
        email: "",
        city: "",
        street: "",
        zipCode: "",
        house: "",
        firstName: "",
        lastName: "",
        role: "User",
        password: ""
    })

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser((prevModel) => ({
            ...prevModel,
            [name]: value
        }));
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            userStore.setLoading(true);
            console.log(user);
            const response: LoginModel = await agent.Users.createUser(user);
            userStore.token = response.token;
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
    }
    return (
        <>
            <Box width="100%" height="100%" display="flex" flexDirection="row" mb="10px">
            <Box display="flex" flexDirection="column"  alignItems="center" justifyContent="center"
                sx={{
                    bgcolor: "primary.main", borderRadius: "20px", p: "50px 40px", m: "50px 40px", gap: "20px"
                }}>
                <Typography variant="h5" sx={{ color: "#D4D8C5" }}>Register</Typography>
                    <Form onSubmit={handleSubmit}>
                        <Box mb="20px" display="flex" flexDirection="row" gap="20px">
                            <TextField
                                required
                                id="email"
                                name="email"
                                placeholder="Email"
                                type="email"
                                value={user.email}
                                onChange={handleInputChange}
                                />
                            <TextField
                                required
                                id="password"
                                name="password"
                                placeholder="Password"
                                type="password"
                                value={user.password}
                                onChange={handleInputChange}
                            />
                        </Box>
                        <Box mb="20px" display="flex" flexDirection="row" gap="20px">
                            <TextField
                                required
                                id="firstName"
                                name="firstName"
                                placeholder="First Name"
                                type="text"
                                value={user.firstName}
                                onChange={handleInputChange}
                            />
                            <TextField
                                required
                                id="lastName"
                                name="lastName"
                                placeholder="Last Name"
                                type="text"
                                value={user.lastName}
                                onChange={handleInputChange}
                            />
                        </Box>
                        <Box mb="20px" display="flex" flexDirection="row" gap="20px">
                            <TextField
                                required
                                id="city"
                                name="city"
                                placeholder="City"
                                type="text"
                                value={user.city}
                                onChange={handleInputChange}
                                />
                            <TextField
                                required
                                id="street"
                                name="street"
                                placeholder="Street"
                                type="text"
                                value={user.street}
                                onChange={handleInputChange}
                                />
                        </Box>
                        <Box mb="20px" display="flex" flexDirection="row" gap="20px">
                        <TextField
                            required
                            id="zipCode"
                                name="zipCode"
                                placeholder="Zip Code"
                            type="text"
                            value={user.zipCode}
                            onChange={handleInputChange}
                            />
                            <TextField
                                required
                                id="house"
                                name="house"
                                placeholder="House"
                                type="text"
                                value={user.house}
                                onChange={handleInputChange}
                            />
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Button type="submit" variant="contained" color="success">Register</Button>
                        </Box>
                    </Form>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box display="flex" flexDirection="column" m="20px" alignItems="center" justifyContent="center"
                    sx={{ bgcolor: "primary.main", borderRadius: "20px", p: "50px 40px", m: "50px 40px", gap: "20px" }}>

                </Box>
            </Box>
        </>
    )
}