import { Button, Paper, TextField, Typography } from "@mui/material";
import { Product } from "../../../app/models/product";
import { useState } from "react";
import { productComment } from "../../../app/models/productComment";
import { v4 as uuidv4 } from 'uuid';
import agent from "../../../app/API/agent";

interface Props {
    product: Product;
}
export default function CommentCreat({product}:Props) {

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
            <br />
            <Paper>
                <Typography variant="h6" component="h2">Feel free to comment:)</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField onChange={handleChange} type="text" placeholder="Your Comment" name="text" />
                    <Button type="submit">Add</Button>
                </form>
            </Paper>
        </>
    )
}