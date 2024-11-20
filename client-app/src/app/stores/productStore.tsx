import { makeAutoObservable, runInAction } from "mobx";
import { Product } from "../models/product";
import agent from "../API/agent";
import { productComment } from "../models/productComment";
export default class ProductStore {
    constructor() {
        makeAutoObservable(this);
    }


    selectedProduct : Product | undefined = undefined;
    products: Product[] = []; 

    setSelectedProduct = (product: Product) => {
            this.selectedProduct = product;
    }
    private setProducts(products: Product[]) {
        this.products = products;
    }

    loading: boolean = false;

    private setLoading = (state: boolean) => {
        this.loading = state;
    }

    

    loadProducts = async () => {
        this.setLoading(true);
        try {
            this.setProducts(await agent.Products.productList());
        }
        catch (error){
            console.error("Error loading products",error);
        }
        finally {
            this.setLoading(false);
        }
    }

    loadProduct = async (id: string) => {
        const existingProduct = this.products.find(x => x.id === id);
        if (existingProduct) {
            this.setSelectedProduct(existingProduct);
            return existingProduct;
        }
        this.setLoading(true);
        try {
            const product = await agent.Products.details(id);
            runInAction(() => {
                this.setProducts([...this.products, product]);
                this.setSelectedProduct(product);
            });
            return product;
        } catch (error) {
            console.error("Error loading product", error);
        } finally {
            this.setLoading(false);
        }
    };

    createProduct = async (product: Product) => {
        this.setLoading(true);
        try {
            await agent.Products.create(product);
            runInAction(() => {
                this.setProducts([...this.products, product]);
            })
        }
        catch(error) {
            console.error("Error creating product", error);
        }
        finally {
            this.setLoading(false);
        }
    }

    updateProduct = async (product: Product) => {
        this.setLoading(true);
        try {
            await agent.Products.update(product);
            runInAction(() => {
                this.setProducts([...this.products.filter(x => x.id !== product.id), product]);
            })
        }
        catch(error) {
            console.error("Error updating product", error);
        }
        finally {
            this.setLoading(true);
        }
    }

    deleteProduct= async (id: string) => {
        this.setLoading(true);
        try {
            await agent.Products.delete(id);
            runInAction(() => {
                this.setProducts([...this.products.filter(x => x.id !== id)]);
            })
        }
        catch (error) {
            console.error("Error deleting product", error);
        }
        finally {
            this.setLoading(false);
        }
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