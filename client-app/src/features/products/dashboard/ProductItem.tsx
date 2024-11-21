import { Card, CardActions, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Product } from '../../../app/models/product';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../app/stores/defaultStore';
import { useState } from 'react';

interface Props {
    product: Product;
}
export default function ProductItem({ product }: Props) {
    const navigate = useNavigate();
    const { productStore, userStore } = useStore();
    const user = userStore.getUser();
    const role = user ? user.role : null;
    const isAdmin = role === "Admin";
    async function handleDelete(){
        await productStore.deleteProduct(product.id);
    }

    const [isFavProduct, setIsFavProduct] = useState<boolean>(
        userStore.favProducts?.some(favProduct => favProduct.id === product.id)
    );
    const [isProductInCart, setIsProductInCart] = useState<boolean>(
        userStore.cartProducts?.some(cartProduct => cartProduct.id === product.id)
    );

    const handleAddFavItem =  (event) => {
        event.stopPropagation();
        if (!userStore.getLoggedIn()) return navigate("/login");
        if (isFavProduct) {
            userStore.removeFavProduct(product);
            setIsFavProduct(false);
        }
        else {
            userStore.addFavProduct(product);
            setIsFavProduct(true);
        }

    }
    const handleAddToCart = (event) => {
        event.stopPropagation();
        if (!userStore.getLoggedIn()) return navigate("/login");
        if (isProductInCart) {
            userStore.removeCartProduct(product);
            setIsProductInCart(false);
        }
        else {
            userStore.addCartProduct(product);
            setIsProductInCart(true);
        }
    }
    return (
        <>
        
            <Card raised sx={{
                mr: "40px", mb: "20px", width: "300px", height: "330px", borderRadius: "20px",
                backgroundImage: `url(/${product.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                textShadow: "1px 1px 2px #C9A63A, 0 0 9px #6B8E23, 0 0 10px #C9A63A",
                cursor: "pointer",
                position: "relative"
            }}
                onClick={() => { navigate(`/product/${product.id}`); productStore.setSelectedProduct(product); }}>

                <CardHeader
                    title={product.name}
                    titleTypographyProps={{ fontSize: "25px", height: "5px", color: "white", width: "300px" }}
                    action={
                        isAdmin && (
                        <IconButton onClick={(e) => { e.stopPropagation(); handleDelete() }} sx={{
                            boxShadow: "0px 0px 10px 5px red",
                            zIndex: "200",
                            position: "absolute",
                            top: "13px",
                            right: "13px"
                        }}>
                            <ClearIcon sx={{ color: "red" }} />
                        </IconButton>
                        )}
                />
                <CardContent sx={{ position: "relative", top: "220px", color: "white" }} >
                    <Typography component="p" variant="subtitle2">{product.price}</Typography>
                    <Typography component="p" variant="subtitle1" >{product.shortDescription}</Typography>
                </CardContent>
                <CardActions sx={{ position: 'relative', top: "140px", left: "190px" }}>
                    <IconButton aria-label="favorite" onClick={handleAddFavItem} sx={{ color: "white", boxShadow: isFavProduct ? "0px 0px 10px 2px pink" : "0px 0px 10px 2px #FFFFD8" }}>
                        <FavoriteIcon sx={{ color: isFavProduct ? "#F0386B" : "white" }} />
                    </IconButton>
                    <IconButton onClick={handleAddToCart} sx={{ color: "white", boxShadow: "0px 0px 10px 5px #FFFFD8" }}>
                        <AddShoppingCartIcon sx={{ color: isProductInCart ? "#0E9B09" : "white" }} />
                    </IconButton>
                </CardActions>
                </Card>
        </>
    )
}