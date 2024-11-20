import { Paper, TextField, Typography } from "@mui/material";
import { Product } from "../../../app/models/product";
import { useState } from "react";
import { productComment } from "../../../app/models/productComment";
import { v4 as uuidv4 } from 'uuid';
import agent from "../../../app/API/agent";
import { useStore } from "../../../app/stores/defaultStore";
import { Form } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

interface Props {
    product: Product;
}
export default function CommentCreat({product}:Props) {

    const { userStore } = useStore();

    const [comment, setComment] = useState<productComment>({
        id: "",
        productId: product.id,
        text: "",
        createdAt: "",
        updated: false,
    })

    const handleSubmit = () => {
        setComment({
            ...comment,
            id: uuidv4(),
            createdAt: new Date().toString(),

        })
        product.comments.push(comment);
        agent.Comments.create(comment);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target; 
        setComment({
            ...comment,
            [name]: value
        });
    };

    return (
        <>
            <Paper sx={{ bgcolor: "white", display: "flex", flexDirection: "column", gap: "20px", alignItems:"center", m:"20px" }}>
                <Typography variant="h6" color="secondary.contrastText">Feel free to comment</Typography>
                <Form onSubmit={handleSubmit}>
                    <TextField onChange={handleChange} type="text" placeholder="Your Comment" fullWidth name="text" />
                    <LoadingButton variant="contained" color="success" type="submit" sx={{ mt: "20px" }}>Add</LoadingButton>
                </Form>
            </Paper>
        </>
    )
}