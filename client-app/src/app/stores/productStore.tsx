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

    setLoading = (state: boolean) => {
        this.loading = state;
    }

    setProducts(products: Product[]) {
        console.log("Setting products:", products);
        this.products = products; 
    }
    loadProducts = async () => {
        try {
            this.setLoading(true);
            const response = await agent.Products.productList();
            runInAction(() => {
                this.setProducts(response);
                this.setLoading(false);
            });
        } catch (error) {
            runInAction(() => {
                console.error("Error loading products:", error);
                this.setLoading(false);
            });
        }
    }
    async loadProduct(id: string) {
        this.setLoading(true);
        if (this.products.length == 0) {
            var product = (await agent.Products.details(id)).data;
            this.setLoading(false);   
            return product;
        }
        else if(!this.products.find(x=>x.id===id)) {
            var product = (await agent.Products.details(id)).data;
            runInAction(() => {
                this.products.push(product);
                this.setLoading(false);
            })
            return product;
        }
        this.setLoading(false);
        return this.products.find(x => x.id === id);
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