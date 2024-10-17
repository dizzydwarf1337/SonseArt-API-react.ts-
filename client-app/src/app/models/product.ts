import { productComment } from "./productComment"

export interface Product {
    id: string
    name: string
    price: number
    fullDescription: string
    shortDescription: string
    comments: productComment[]
    image: string
}