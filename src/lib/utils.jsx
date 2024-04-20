import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cls(...args) {
    return twMerge(clsx(...args));
}

// for get if the business is open

export function getOpenBusiness(business) {
    if (!business) return false;
    // validar el horario de compra del negocio
    const date = new Date();
    const day = date.toLocaleDateString("en-En", { weekday: "long" });
    const hour = date.getHours();
    const minutes = date.getMinutes();

    // saber si el negocio esta abierto
    const open = business[day.toLowerCase() + "_open"];
    const close = business[day.toLowerCase() + "_close"];
    const [openHour, openMinutes] = open.split(":");
    const [closeHour, closeMinutes] = close.split(":");

    if (
        hour < openHour ||
        (hour == openHour && minutes < openMinutes) ||
        hour > closeHour ||
        (hour == closeHour && minutes > closeMinutes)
    ) {
        return false;
    }
    return true;
}

// separe carts for business

export function separateCarts(carts) {
    let extendedCarts = [];
    if (carts) {
        for (let cart of carts) {
            let businesses = []; // tener business unicos
            /*
                {
                    ...datos
                    product_carts: [
                        product: {
                            category: {
                                business_id,
                                business: {
                                    ...datos
                                }
                            }
                        }
                    ]
                }
            */
            for (let product_cart of cart.product_carts) {
                if (
                    !businesses?.some(
                        (item) => item.id == product_cart?.product?.category?.business_id
                    )
                ) {
                    businesses.push(product_cart?.product?.category?.business);
                }
            }

            // console.log(businesses);

            let newCarts = [];

            for (let business of businesses) {
                let product_carts = cart.product_carts.filter(
                    (item) => item?.product?.category?.business_id == business.id
                );
                newCarts.push({
                    ...cart,
                    product_carts,
                });
            }

            extendedCarts = [...extendedCarts, ...newCarts];
        }
    }
    extendedCarts = extendedCarts.map((item) => ({
        ...item,
        key: `cart${item.id}-business${item.product_carts[0]?.product?.category?.business_id}`,
    }));
    return extendedCarts;
}
