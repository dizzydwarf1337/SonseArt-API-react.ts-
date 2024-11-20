import { Box, Button, TextField, Typography } from "@mui/material";
import { useStore } from "../../../app/stores/defaultStore";
import { useEffect, useState } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import { Product } from "../../../app/models/product";
import { v4 as uuidv4 } from 'uuid';
import "../styles.css";
export default function ProductCreate() {
    const { productStore } = useStore();
    const navigate  = useNavigate();
    const { id }  = useParams();

    const [productData, setProduct] = useState<Product>({
        id:"",
        name: "",
        fullDescription: "",
        shortDescription:"",
        price: 0,
        image: "productImages/blank.jpg",
        comments: [],
    });

    const [imageFile, setSelectedFile] = useState<File|null>(null);

    useEffect(() => {
        if (id) {
            productStore.loadProduct(id).then((product) => { setProduct(product) });
        }
        else console.log("No product found");
    }, [id, productStore])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setProduct({
            ...productData,
            [name]: value
        });
    };

    const handleSubmit =(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData();
        if (imageFile) {
            
            formData.append('imageFile', imageFile);
        }
        if (id) {
            productStore.updateProduct(productData).then(() =>
                productStore.uploadImage(productData.id, formData).
                    then(() => navigate(`/product/${productData.id}`)));
        }
        else {
            productData.id = uuidv4();
            setProduct(productData);
            productStore.createProduct(productData).then(() =>
                productStore.uploadImage(productData.id, formData).
                    then(() => navigate(`/product/${productData.id}`)));
            
        }
    }
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFile(event.target.files[0]);
        }

    };

    return (
        <>
            <Box width="100%" height="100%" display="flex" flexDirection="row" m="5px">
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center"
                    sx={{ bgcolor: "primary.main", borderRadius: "20px", p: "20px 20px", m: "30px 20px", gap: "20px" }}>
                <Typography variant="h4">Create Product</Typography>
                <Form onSubmit={handleSubmit}
                    style={{
                    display: "flex", flexDirection: "column", width: "100%", maxWidth: "400px", alignItems: "center", color: "#D4D8C5",
                    fontSize:"20px"
                }} >
                    <label>Product Name:</label>
                    <TextField type="text" onChange={handleInputChange} value={productData.name} placeholder="Name" name="name" />
                    <label>Product Description:</label>
                    <TextField type="text" onChange={handleInputChange} value={productData.fullDescription} placeholder="Full description" name="fullDescription" />
                    <label>Product Short Description:</label>
                    <TextField type="text" onChange={handleInputChange} value={productData.shortDescription} placeholder="Short description" name="shortDescription" />
                    <label>Product Price:</label>
                    <TextField type="number" onChange={handleInputChange} value={productData.price} placeholder="Price" name="price" />
                    <label>Product photo:</label>
                    <TextField type="file" onChange={handleFileChange} name="imageFile" />
                        <Button variant="contained" color="primary" type="submit" sx={{mt:"20px"} }>Submit</Button>
                </Form>
                </Box>
            </Box>
        </>
    )
}