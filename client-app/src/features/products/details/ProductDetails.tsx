import  { useEffect, useState } from 'react';
import { Product } from '../../../app/models/product';
import { Link, useParams } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import "../styles.css";
import CommentDashboard from './commentDashboard';
import CommentCreate from './CommentCreate';
import { useStore } from '../../../app/stores/defaultStore';

export default function ProductDetails() {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | undefined>();
    const { productStore } = useStore();

    useEffect(() => {
        if (id) {
            try {
                if (productStore.products.length == 0) {
                    productStore.loadProduct(id).then(() => { setProduct(productStore.products.find(x => x.id === id)); })
                    console.log("Product loaded from API");
                }
                else if (productStore.products.find(x => x.id === id)) {
                    setProduct(productStore.products.find(x => x.id === id));
                    console.log("Product found in store");
                }
                else console.log("Product Not Found");
            }
            catch {
                console.error("Error while setting product");
            }
        }
    }, [id])

    if (productStore.loading || !product) return (<LoadingComponent />);

    return (
        <>
            <Box sx={{
                display: 'flow',
                justifyContent: 'center',
                alignItems: 'space-between',
            }}
            >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    pr: "40px",
                    pb: "40px",
                    pl: "40px",
                    pt:"10px",
                    width: '100%',
                }}
            >
                <Box sx={{ flex: 1, textAlign: 'left', paddingRight: '20px', mr:"400px" }}>
                    <Typography variant="h4" gutterBottom>
                        {product.name}
                    </Typography>
                    <Box
                        component="img"
                        src={`/${product.image}`}
                        alt={product.name}
                        sx={{
                            width: '100%',
                            maxWidth: '350px',
                            borderRadius: '20px',
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.5)',
                        }}
                    />
                </Box>

                <Box
                    sx={{
                        flex: 1,
                        textAlign: 'left',
                        paddingLeft: '20px',
                        borderLeft: '1px solid #ccc',
                        paddingTop: '20px'
                    }}
                >
                    <Typography variant="h6" gutterBottom color="text.secondary">
                        {product.shortDescription}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {product.fullDescription}
                     </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: "#727548" }}>
                        {product.price}
                    </Typography>
                    <Box mt="20px">
                        <Link to={`/product/Modify/${product.id}`}>
                            <Button sx={{ color: "#D4D8C5", backgroundColor: "#727548", mr: "20px" }}>Edit</Button>
                        </Link>
                        <Button  sx={{ color: "#D4D8C5", backgroundColor: "#727548" }}>Add to cart</Button>
                    </Box>
                </Box>
                </Box>
                <Box>
                    <CommentCreate product={product} />
                </Box>
                <Box sx={{
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                }}>
                <CommentDashboard />
                </Box>
            </Box>
        </>
    )

}