import { createContext, useContext } from "react";
import ProductStore from "./productStore";
import UserStore from "./userStore";

interface Store {
    productStore: ProductStore;
    userStore: UserStore;
}

export const store: Store = {
    productStore: new ProductStore(),
    userStore: new UserStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
