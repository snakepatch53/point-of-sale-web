import { createContext, useEffect, useState } from "react";
import { showNotification } from "../component/Notification";
import { getOpenBusiness } from "../utils/utils";

// 1. Crear el contexto
export const ShopCartContext = createContext();

// 2. Crear el provider
export function ShopCartProvider({ children }) {
    const [shopCart, setShopCart] = useState([]);

    const addProduct = (product) => {
        // no se puede comprar si el negocio esta cerrado
        if (!getOpenBusiness(product?.category?.business)) {
            return showNotification({
                title: "Negocio cerrado",
                message: "El negocio se encuentra cerrado",
                type: "warning",
            });
        }

        // no se puede comprar de distintos negocios
        // if (
        //     shopCart?.length > 0 &&
        //     shopCart[0]?.category?.business?.id != product?.category?.business?.id
        // ) {
        //     return showNotification({
        //         title: "No se puede comprar",
        //         message: "No se puede comprar de distintos negocios",
        //         type: "warning",
        //     });
        // }

        // Si ya existe el producto en el carrito, aumentar la cantidad
        const exist = shopCart.find((item) => item.id == product.id);
        let newProduct = { ...product, quantity: 1 };
        if (exist) {
            newProduct = { ...exist, quantity: exist.quantity + 1 };
            // setShopCart(
            //     shopCart.map((item) =>
            //         item.id == product.id ? { ...exist, quantity: exist.quantity + 1 } : item
            //     )
            // );
        } else {
            // setShopCart([...shopCart, { ...product, quantity: 1 }]);
        }

        setShopCart(
            orderShopCart(shopCart.filter((item) => item.id != product.id).concat(newProduct))
        );

        // traigo lo que ya tengo en localStorage
        const cartFromStorage = JSON.parse(window.localStorage.getItem("shopCart"));

        // si ya tengo algo en localStorage
        if (cartFromStorage) {
            const exist = cartFromStorage.find((item) => item.id === product.id);
            if (exist) {
                window.localStorage.setItem(
                    "shopCart",
                    JSON.stringify(
                        cartFromStorage.map((item) =>
                            item.id === product.id
                                ? { ...exist, quantity: exist.quantity + 1 }
                                : item
                        )
                    )
                );
            } else {
                window.localStorage.setItem(
                    "shopCart",
                    JSON.stringify([...cartFromStorage, { ...product, quantity: 1 }])
                );
            }
        } else {
            // si no tengo nada en localStorage lo creo
            window.localStorage.setItem("shopCart", JSON.stringify([{ ...product, quantity: 1 }]));
        }
        showNotification({
            title: "Producto agregado",
            message: "Producto agregado al carrito",
            type: "success",
        });
    };

    const removeProduct = (product) => {
        const exist = shopCart.find((item) => item.id === product.id);
        if (exist) {
            setShopCart(shopCart.filter((item) => item.id !== product.id));
        }
        const cartFromStorage = JSON.parse(window.localStorage.getItem("shopCart"));
        if (cartFromStorage) {
            if (exist) {
                window.localStorage.setItem(
                    "shopCart",
                    JSON.stringify(cartFromStorage.filter((item) => item.id !== product.id))
                );
            }
        }
    };

    const addQuantity = (product) => {
        const exist = shopCart.find((item) => item.id === product.id);
        if (exist) {
            setShopCart(
                shopCart.map((item) =>
                    item.id === product.id ? { ...exist, quantity: exist.quantity + 1 } : item
                )
            );
        }

        const cartFromStorage = JSON.parse(window.localStorage.getItem("shopCart"));
        if (cartFromStorage) {
            const exist = cartFromStorage.find((item) => item.id === product.id);
            if (exist) {
                window.localStorage.setItem(
                    "shopCart",
                    JSON.stringify(
                        cartFromStorage.map((item) =>
                            item.id === product.id
                                ? { ...exist, quantity: exist.quantity + 1 }
                                : item
                        )
                    )
                );
            }
        }
    };

    const removeQuantity = (product) => {
        const exist = shopCart.find((item) => item.id === product.id);
        if (exist && exist.quantity > 1) {
            setShopCart(
                shopCart.map((item) =>
                    item.id === product.id ? { ...exist, quantity: exist.quantity - 1 } : item
                )
            );
        }
        const cartFromStorage = JSON.parse(window.localStorage.getItem("shopCart"));
        if (cartFromStorage) {
            const exist = cartFromStorage.find((item) => item.id === product.id);
            if (exist && exist.quantity > 1) {
                window.localStorage.setItem(
                    "shopCart",
                    JSON.stringify(
                        cartFromStorage.map((item) =>
                            item.id === product.id
                                ? { ...exist, quantity: exist.quantity - 1 }
                                : item
                        )
                    )
                );
            }
        }
    };

    const clearShopCart = () => {
        setShopCart([]);
        window.localStorage.removeItem("shopCart");
    };

    useEffect(() => {
        const cartFromStorage = JSON.parse(window.localStorage.getItem("shopCart"));
        if (cartFromStorage) {
            setShopCart(orderShopCart(cartFromStorage));
        }
    }, []); // eslint-disable-line

    const orderShopCart = (_shopCart) => {
        const _reorder = _shopCart.sort(
            (a, b) => a?.category?.business?.id - b?.category?.business?.id
        );
        return _reorder;
    };

    return (
        <ShopCartContext.Provider
            value={{
                shopCart,
                addProduct,
                removeProduct,
                addQuantity,
                removeQuantity,
                clearShopCart,
            }}
        >
            {children}
        </ShopCartContext.Provider>
    );
}
