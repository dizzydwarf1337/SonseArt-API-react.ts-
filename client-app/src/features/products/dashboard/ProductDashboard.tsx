import {Box, Button, Grid, Grid2, TextField} from '@mui/material';
import { Product } from '../../../app/models/product';
import  { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/defaultStore';
import LoadingComponent from '../../../app/layout/LoadingComponent';


export default observer (function  ProductDashboard() {


    const { productStore } = useStore();
    const { products, loadProducts, loading } = productStore;
    const [searchString, setSearchString] = useState<string>("");

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchString(event.target.value);
    };

    useEffect(() => {
        if (products.length === 0) loadProducts();
    }, [loadProducts, products.length]);

    if (loading) return <LoadingComponent />;

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchString.toLowerCase())
        || product.shortDescription.toLowerCase().includes(searchString.toLowerCase())
    );
    if (loading || !products) return <LoadingComponent/>
    return (
        <>
            <Box display="flex" flexDirection="column" alignItems="center" p={2}>
                <Box display="flex" justifyContent="center" width="100%" mb={3}>
                    <TextField onInput={handleInput} variant="outlined" placeholder="Find by name of category"></TextField>
                    <Button variant="contained" color="primary" sx={{
                        borderRadius: "0px 20px 20px 0px", m:0,'&:hover': {backgroundColor: 'primary.dark', color:"secondary.main"} }}>Search</Button>
                </Box>
                <Grid2 container sx={{ p: "5px", m: "5px", justifyContent: "space-evenly" }} spacing={1.5}>
                    {filteredProducts.map((product: Product) => (
                        <Grid item key={product.id}>
                            <ProductItem product={product} />
                        </Grid>
                    ))}
                    </Grid2>
            </Box>
        </>

        )
})
