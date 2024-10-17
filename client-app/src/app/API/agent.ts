
import axios, { AxiosResponse } from 'axios';
import { Product } from '../models/product';
import { productComment } from '../models/productComment';

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Products = {
    productList: () => requests.get<Product[]>('/Product'),
    details: (id: string) => requests.get<Product>(`/Product/${id}`),
    create: (product: Product) => requests.post<void>('/Product', product),
    update: (product: Product) => requests.put<void>(`/Product/${product.id}`, product),
    delete: (id: string) => requests.delete<void>(`/Product/${id}`),
    upload: (id: string, imageFile: FormData) => requests.post(`/Product/${id}`, imageFile),
}
const Comments = {
    commentList: (id: string) => requests.get<Comment[]>(`/Comment/${id}`),
    create: (comment: productComment) => requests.post<void>('/Comment', comment),
    delete: (id: string) => requests.delete<void>(`/Comment/${id}`),
    update: (id: string, comment: productComment) => requests.put<void>(`/Comment/${id}`, comment),
}

const agent = {
    Products,
    Comments
}

export default agent;