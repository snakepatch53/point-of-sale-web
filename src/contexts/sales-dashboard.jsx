import { createContext, useContext, useEffect, useState } from "react";
import { getProducts } from "../services/products";
import { getClients } from "../services/clients";
import { showNotification } from "../components/Notification";
import { SessionContext } from "./session";
import { EntityContext } from "./entity";
import { bulkSale } from "../services/combo";

export const SalesDashboardContext = createContext();

export function SalesDashboardProvider({ children }) {
    const { session } = useContext(SessionContext);
    const { entity } = useContext(EntityContext);
    const [products, setProducts] = useState(null);
    const [clients, setClients] = useState(null);
    const [selectedClient, setSelectedClient] = useState(null);
    const [sales, setSales] = useState([]);

    useEffect(() => {
        getProducts().then((res) => {
            // setProducts(res);
            setProducts(res.filter((product) => product.stock > 0));
        });
        getClients().then((res) => setClients(res));
    }, []);

    const searchClient = (value) => {
        if (!value) return setSelectedClient(null);
        const client = clients?.find(
            (client) =>
                client?.name?.toString()?.toLowerCase()?.includes(value) ||
                client?.name1?.toString()?.toLowerCase()?.includes(value) ||
                client?.lastname?.toString()?.toLowerCase()?.includes(value) ||
                client?.lastname2?.toString()?.toLowerCase()?.includes(value) ||
                client?.dni?.includes(value)
        );
        if (!client) return setSelectedClient(null);
        setSelectedClient(client);
    };

    const sale = () => {
        if (sales.length <= 0)
            return showNotification({
                title: "Cancelado",
                message: "No hay productos para vender",
                type: "warning",
            });

        const data = {
            iva: entity.tax,
            client_id: selectedClient?.id || 0,
            user_id: session.id,
            products: sales,
        };

        bulkSale({ data }).then((res) => {
            console.log(res);
        });
    };

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
        } else {
            setSales((prev) => {
                const newSale = {
                    ...product,
                    quantity: 1,
                };
                return prev ? [...prev, newSale] : [newSale];
            });
        }

        setProducts((prev) =>
            prev.map((p) =>
                p.id === product.id
                    ? {
                          ...p,
                          stock: p.stock - 1,
                      }
                    : p
            )
        );
    };

    const removeSale = (product) => {
        setSales((prev) => {
            return prev.filter((sale) => sale.id !== product.id);
        });
        setProducts((prev) =>
            prev.map((p) =>
                p.id === product.id
                    ? {
                          ...p,
                          stock: p.stock + product.quantity,
                      }
                    : p
            )
        );
    };

    const changeQuantity = (product, quantity) => {
        setSales((prev) =>
            prev.map((sale) =>
                sale.id === product.id
                    ? {
                          ...sale,
                          quantity: sale.quantity + quantity,
                      }
                    : sale
            )
        );
        setProducts((prev) =>
            prev.map((p) =>
                p.id === product.id
                    ? {
                          ...p,
                          stock: p.stock - quantity,
                      }
                    : p
            )
        );
    };

    const incrementQuantity = (product) => {
        const stock = products.find((p) => p.id === product.id).stock || 0;
        if (stock === 0)
            return showNotification({
                title: "Cancelado",
                message: "Producto sin stock",
                type: "warning",
            });
        changeQuantity(product, 1);
    };

    const decrementQuantity = (product) => {
        if (product.quantity === 1) return removeSale(product);
        changeQuantity(product, -1);
    };

    return (
        <SalesDashboardContext.Provider
            value={{
                products,
                selectedClient,
                sales,
                addSale,
                removeSale,
                incrementQuantity,
                decrementQuantity,
                sale,
                searchClient,
            }}
        >
            {children}
        </SalesDashboardContext.Provider>
    );
}
