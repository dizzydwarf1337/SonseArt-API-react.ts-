import  { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import "../styles.css";
import CommentDashboard from './commentDashboard';
import CommentCreate from './CommentCreate';
import { useStore } from '../../../app/stores/defaultStore';
import { Product } from '../../../app/models/product';

export default function ProductDetails() {
    const { id } = useParams<{ id: string }>();
    const { productStore } = useStore();
    const { loadProduct, loading } = productStore;
    const { userStore } = useStore();
    const [product, setProduct] = useState<Product>();

    useEffect(() => {
        if (id) {
            try {
                if (productStore.products.find(x => x.id === id)) {
                    setProduct(productStore.products.find(x => x.id === id));
                    console.log("Product found in store");
                }
                else {
                    loadProduct(id).then(() => { setProduct(productStore.products.find(x => x.id === id)); }).catch(error => console.log(error));
                    console.log(productStore.selectedProduct);
                    console.log("Product loaded from API");
                }
            }
            catch {
                console.error("Error while setting product");
            }
        }
    }, [id]);

    if (loading || !product) return (<LoadingComponent />);

    return (
        <>
            <Box position="relative" width="100%" height="100%" m="10px 40px 20px 40px">
                <Box display="flex" flexDirection="row" alignItems="center" alignContent="center" m="20px" gap="600px">
                    <Box display="flex" flexDirection="column">
                        <Typography variant="h4" color="primary.main" gutterBottom>
                        {product.name}
                        </Typography>
                        <Box
                            component="img"
                            src={`/${product.image}`}
                            alt={product.name}
                            sx={{
                                width: '100%',
                                maxWidth: '500px',
                                borderRadius: '20px',
                                height: "100%",
                                maxHeight: "600px",
                                imageResolution: "from-image",
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
                        <Typography variant="h4" gutterBottom color="text.secondary">
                            {product.shortDescription}
                        </Typography>
                        <Typography variant="h5" color="secondary.contrastText" gutterBottom>
                            {product.fullDescription}
                         </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: "#727548" }}>
                            {product.price}
                        </Typography>
                            <Box mt="20px">
                                {userStore.getUser()?.role=="Admin" &&
                                    <Link to={`/product/Modify/${product.id}`}>
                                        <Button>Edit</Button>
                                    </Link>
                                }
                            <Button  variant="contained" color="success">Add to cart</Button>
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
