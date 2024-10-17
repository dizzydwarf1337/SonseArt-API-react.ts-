import { makeAutoObservable, runInAction } from "mobx";
import { Product } from "../models/product";
import agent from "../API/agent";
import { productComment } from "../models/productComment";
export default class ProductStore {
    constructor() {
        makeAutoObservable(this);
    }

    products: Product[] = []; 
    
    loading: boolean = false;

    private setLoading = (state: boolean) => {
        this.loading = state;
    }

    private setProducts(products: Product[]) {
        console.log("Setting products:", products);
        this.products = products; 
    }

    loadProducts = async () => {
        this.setLoading(true);
        try {
            this.setProducts(await agent.Products.productList());
            this.setLoading(false);
        }
        catch {
            console.error("Error loading products",Error);
            this.setLoading(false);
        }
    }

    loadProduct = async (id: string) => {
        this.setLoading(true);
        try {
            if (!this.products.find(x => x.id === id)) {
                const product = await agent.Products.details(id);
                runInAction(() => {
                    this.setLoading(false);
                })
                
                return product;
            }
            runInAction(() => {
                this.setLoading(false);
            })
            return this.products.find(x => x.id === id);
            
        }
        catch {
            console.log("Error loading product");
            this.setLoading(true);
        }
    }

    async createProduct(product: Product) {
        this.setLoading(true);
        await agent.Products.create(product);
        this.products.push(product);
        this.setLoading(false);
    }
    async updateProduct(product: Product) {
        this.setLoading(true);
        await agent.Products.update(product);
        this.products = [...this.products.filter(x => x.id !== product.id), product];
        this.setLoading(false);
    }
    async deleteProduct(id: string) {
        this.setLoading(true);
        await agent.Products.delete(id);
        this.products = [...this.products.filter(x => x.id !== id)];
        this.setLoading(false);
    }
    async uploadImage(id: string, file: FormData) {
        this.setLoading(true);
        await agent.Products.upload(id, file);
        this.setLoading(false);
    }


    async loadComments(productId: string) {
        this.setLoading(true);
        let product = this.products.find(x => x.id === productId);
        if (product) {
            const comments = await agent.Comments.commentList(productId);
            product.comments = comments;
        }  
        this.setLoading(false);
    }
    async addComment(comment: productComment) {
        this.setLoading(true);
        let product = this.products.find(x => x.id === comment.productId);
        if (product) {
            await agent.Comments.create(comment);
            this.loadComments(comment.productId);
        }
        this.setLoading(false);
    }
    async deleteComment(comment: productComment) {
        this.setLoading(true);
        let product = this.products.find(x => x.id === comment.productId);
        if (product) {
            await agent.Comments.delete(comment.id);
            product.comments.filter(x => x.id !== comment.id);
            await this.loadComments(comment.productId);
        }
        this.setLoading(false);
    }
    async updateComment(id: string, comment: productComment) {
        this.setLoading(true);
        let product = this.products.find(x => x.id === comment.productId);
        if (product) {
            let index = product.comments.findIndex(x => x.id === id);
            if (index !== -1) {
                product.comments[index] = comment;
            }
            await agent.Comments.update(id, comment);   
        }
        this.setLoading(false); 
    }

}