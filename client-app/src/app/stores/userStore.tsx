import { makeAutoObservable, runInAction } from "mobx";
import { User } from "../models/user";
import { Product } from "../models/product";


export default class UserStore {

    constructor(){
        makeAutoObservable(this);
        const loggedIn = localStorage.getItem("isLoggedIn") === "true";
        const userData = localStorage.getItem("user");
        const tokenValue = localStorage.getItem("token"); 
        const favProducts = localStorage.getItem("favProducts");
        const cartProducts = localStorage.getItem("cartProducts");
        this.setLoggedIn(loggedIn);
        if (userData) {
            runInAction(() => { 
            this.setUser(JSON.parse(userData));
            this.setToken(tokenValue);
            this.setFavProducts(JSON.parse(favProducts) ?? []);
            this.cartProducts =(JSON.parse(cartProducts) ?? []);
            })
         }
    }
    token: string | null = null;
    user: User | null = null;
    isLoggedIn: boolean = false;
    loading: boolean = false;
    favProducts: Product[] = [];
    cartProducts: Product[] = [];

    setToken = (token: string | null) => {
        this.token= token;
    }
    getToken = () => this.token;

    setLoading = (value: boolean) => {
        this.loading = value;
    }
    getLoading = () => this.loading;

    setUser = (user: User | null) =>
    {
        this.user = user;
    }
    getUser = () => this.user;

    setLoggedIn = (value: boolean) => {
        this.isLoggedIn = value;
    }
    getLoggedIn = () => this.isLoggedIn;

    setCartProducts = (products: Product[]) => {
        this.cartProducts = products;
        localStorage.setItem("cartProducts", JSON.stringify(this.cartProducts));
    }

    getCartProducts = () => this.cartProducts;

    addCartProduct = (product: Product) => {
        this.cartProducts.push(product);
        localStorage.setItem("cartProducts", JSON.stringify(this.cartProducts));
    }
    removeCartProduct = (product: Product) => {
        this.cartProducts = this.cartProducts.filter(x => x.id !== product.id);
        localStorage.removeItem("cartProducts");
        localStorage.setItem("cartProducts", JSON.stringify(this.cartProducts));
    }
    removeCartProducts = () => {
        this.cartProducts = [];
        localStorage.removeItem("cartProducts");
    }

    addFavProduct = (product: Product) => {
            this.favProducts.push(product);
        localStorage.setItem("favProducts", JSON.stringify(this.favProducts));
    }
    removeFavProduct = (product: Product) => {
            this.favProducts = this.favProducts.filter(x => x.id !== product.id);
            localStorage.removeItem("favProducts");
            localStorage.setItem("favProducts", JSON.stringify(this.favProducts));
    }
    setFavProducts = (products: Product[]) => {
        this.favProducts = products;
        localStorage.setItem("favProducts", JSON.stringify(this.favProducts));
    }
}