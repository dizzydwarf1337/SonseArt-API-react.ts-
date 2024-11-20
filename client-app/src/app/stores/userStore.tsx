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
        this.setLoggedIn(loggedIn);
        if (userData) {
            runInAction(() => { 
            this.setUser(JSON.parse(userData));
            this.setToken(tokenValue);
            this.setFavProducts(JSON.parse(favProducts));
            })
         }
    }
    token: string | null = null;
    user: User | null = null;
    isLoggedIn: boolean = false;
    loading: boolean = false;
    favProducts: Product[] = [];

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