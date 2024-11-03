import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { Product } from '../models/product';
import { productComment } from '../models/productComment';
import { store } from '../stores/defaultStore';
import { LoginModel } from '../models/loginModel';
import { User } from '../models/user';


axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    
    if (config.headers && !config.headers['NoAuth']) {
        const token = store.userStore.getToken();
        token ? token : localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
    }
    return config;
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: <T>(url: string, noAuth = false) =>
        axios.get<T>(url, { headers: { NoAuth: noAuth } }).then(responseBody),
    post: <T>(url: string, body: {}, noAuth = false) =>
        axios.post<T>(url, body, { headers: { NoAuth: noAuth } }).then(responseBody),
    put: <T>(url: string, body: {}, noAuth = false) =>
        axios.put<T>(url, body, { headers: { NoAuth: noAuth } }).then(responseBody),
    delete: <T>(url: string, noAuth = false) =>
        axios.delete<T>(url, { headers: { NoAuth: noAuth } }).then(responseBody),
};

const Products = {
    productList: (noAuth = false) => requests.get<Product[]>('/Product', noAuth),
    details: (id: string, noAuth = false) => requests.get<Product>(`/Product/${id}`, noAuth),
    create: (product: Product) => requests.post<void>('/Product', product),
    update: (product: Product) => requests.put<void>(`/Product/${product.id}`, product),
    delete: (id: string) => requests.delete<void>(`/Product/${id}`),
    upload: (id: string, imageFile: FormData) => requests.post(`/Product/${id}`, imageFile),
};

const Comments = {
    commentList: (id: string, noAuth = false) => requests.get<productComment[]>(`/Comment/${id}`, noAuth),
    create: (comment: productComment) => requests.post<void>('/Comment', comment),
    delete: (id: string) => requests.delete<void>(`/Comment/${id}`),
    update: (id: string, comment: productComment) => requests.put<void>(`/Comment/${id}`, comment),
};
const Auth = {
    login: (loginModel: LoginModel, noAuth = false) => requests.post<LoginModel>('/auth/login', loginModel, noAuth),
    logout: (email: string) => requests.post<void>('/auth/logout', { email }),
};
const Users = {
    getUserById: (id: string, noAuth = false) => requests.get<User>(`/user/${id}`, noAuth),
    getUserByEmail: (email: string) => requests.post<User>('/user/email/', { email }),
    createUser: (user: User) => requests.post<string>('/user', user),
    updateUser: (user: User) => requests.put<void>(`/user/${user.id}`, user),
    changePassword: (id: string, password: string) => requests.put<void>(`/user/password/${id}`, password),
}
const agent = {
    Products,
    Comments,
    Auth,
    Users
};

export default agent;
