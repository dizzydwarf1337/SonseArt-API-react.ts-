import { Button, Grid2, TextField, Typography } from "@mui/material";
import { useStore } from "../../../app/stores/defaultStore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
            <Grid2 container sx={{
                mt:"20px",
                mb: "20px",
                width: "400px",
                height: "500px",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#727548",
                borderRadius: "20px",
                boxShadow: "0px 0px 10px 10px #D4D8C5"
            }}>
                <Typography variant="h4" color="#D4D8C5">Create Product</Typography>
                <form onSubmit={handleSubmit}
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
                    <Button sx={{ backgroundColor: "#D4D8C5", mt: "5px", color:"#727548"}} type="submit">Submit</Button>
                </form>
            </Grid2>
        </>
    )
}