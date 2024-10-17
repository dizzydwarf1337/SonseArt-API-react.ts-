import {Grid, Grid2} from '@mui/material';
import { Product } from '../../../app/models/product';
import  { useEffect } from 'react';
import ProductItem from './ProductItem';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/defaultStore';


export default observer (function  ProductDashboard() {


    const { productStore } = useStore();
    const { products, loadProducts } = productStore;

    useEffect(() => {
        loadProducts();
    }, [products.length, loadProducts]);



    return (
        <Grid2 container sx={{ p: "5px", m: "5px", justifyContent: "space-evenly" }} spacing={1.5}>
            {products.map((product: Product) => (
                <Grid item  key={product.id}>
                    <ProductItem product={product} />
                </Grid>
            ))}
        </Grid2>


    )
})
