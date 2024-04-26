import { createContext, useEffect, useState } from "react";
import { getProducts } from "../services/products";
import { getClients } from "../services/clients";
import { showNotification } from "../components/Notification";

export const SalesDashboardContext = createContext();

export function SalesDashboardProvider({ children }) {
    const [products, setProducts] = useState(null);
    const [clients, setClients] = useState(null);

    const [sales, setSales] = useState([]);

    useEffect(() => {
        getProducts().then((res) => setProducts(res));
        getClients().then((res) => setClients(res));
    }, []);

    const addSale = (product) => {
        const isAlreadyInSales = sales?.some((sale) => sale.id === product.id);
        if (product.stock === 0) {
            return showNotification({
                title: "Cancelado",
                message: "Producto sin stock",
                type: "warning",
            });
        }
        if (isAlreadyInSales) {
            setSales((prev) =>
                prev.map((sale) =>
                    sale.id === product.id
                        ? {
                              ...sale,
                              quantity: sale.quantity + 1,
                          }
                        : sale
                )
            );
            return;
        }
        setSales((prev) => {
            const newSale = {
                ...product,
                quantity: 1,
            };
            return prev ? [...prev, newSale] : [newSale];
        });
    };

    const removeSale = (product) => {
        setSales((prev) => {
            return prev.filter((sale) => sale.id !== product.id);
        });
    };

    const incrementQuantity = (product) => {
        setSales((prev) =>
            prev.map((sale) =>
                sale.id === product.id
                    ? {
                          ...sale,
                          quantity: sale.quantity + 1,
                      }
                    : sale
            )
        );
    };

    const decrementQuantity = (product) => {
        setSales((prev) =>
            prev.map((sale) =>
                sale.id === product.id
                    ? {
                          ...sale,
                          quantity: sale.quantity - 1,
                      }
                    : sale
            )
        );
    };

    return (
        <SalesDashboardContext.Provider
            value={{
                products,
                clients,
                sales,
                addSale,
                removeSale,
                incrementQuantity,
                decrementQuantity,
            }}
        >
            {children}
        </SalesDashboardContext.Provider>
    );
}
