import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PageContent from "../components/PageContent";
import { faMinus, faPlus, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Button";
import { useContext, useState } from "react";
import { SalesDashboardContext, SalesDashboardProvider } from "../contexts/sales-dashboard";
import { InfoContext } from "../contexts/info";

// TODO: tengo que sincronizar la cantidad con el stock de los productos de la sección de productos

export default function Home() {
    return (
        <SalesDashboardProvider>
            <PageContent className="flex flex-col xl:flex-row w-full p-3 gap-3">
                <div className="flex-1">
                    <SectionProducts />
                </div>
                <div className="flex-1 flex flex-col gap-3 xl:max-w-[600px] ">
                    <SectionClient />
                    <SectionSale />
                </div>
            </PageContent>
        </SalesDashboardProvider>
    );
}

function SectionProducts() {
    const { products, addSale } = useContext(SalesDashboardContext);
    const handleAddSale = (product) => () => addSale(product);
    return (
        <div className="flex-1 flex flex-col gap-4 bg-[--c3] p-4 rounded-md border-solid border-t-2 border-t-[--c3-txt2] ">
            <Search placeholder="Busca por código, nombre o categoría" />
            <div className="grid lg:grid-cols-2 gap-2">
                {products?.map((product) => (
                    <SectionProductItem
                        key={product.id}
                        src={product.photo_url}
                        name={product.name}
                        mark={product.mark}
                        stock={product.stock}
                        price={product.price}
                        onClick={handleAddSale(product)}
                    />
                ))}
            </div>
        </div>
    );
}

function SectionClient() {
    const { clients } = useContext(SalesDashboardContext);
    const [selectedClient, setSelectedClient] = useState(null);

    const handleSearch = (e) => {
        const value = e.target.value.toString().toLowerCase();
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

    return (
        <div className=" flex flex-col gap-2 bg-[--c3] p-4 rounded-md border-solid border-t-2 border-t-[--c3-txt2] ">
            <Search placeholder="Busca por nombr o cédula" onSearch={handleSearch} />
            {!selectedClient && (
                <span className="block p-2 rounded-md text-[--c3-txt] text-center opacity-70 border-solid border border-black/30 ">
                    Consumidor final
                </span>
            )}
            {selectedClient && (
                <>
                    <span className="block p-2 rounded-md text-[--c3-txt] text-center opacity-70 border-solid border border-black/30 ">
                        {selectedClient?.name} {selectedClient?.name2} {selectedClient.lastname}{" "}
                        {selectedClient.lastname2}
                    </span>
                    <span className="block p-2 rounded-md text-[--c3-txt] text-center opacity-70 border-solid border border-black/30 ">
                        {selectedClient?.dni}
                    </span>
                </>
            )}
        </div>
    );
}

function SectionSale() {
    const { sales, removeSale, incrementQuantity, decrementQuantity } =
        useContext(SalesDashboardContext);
    const { info } = useContext(InfoContext);
    const subtotal = sales?.reduce((acc, sale) => acc + sale.price * sale.quantity, 0);
    const iva = (subtotal * info?.tax) / 100;
    const total = subtotal + iva;

    const handleRemoveSale = (sale) => () => removeSale(sale);
    const handleQuantityDown = (sale) => () => decrementQuantity(sale);
    const handleQuantityUp = (sale) => () => incrementQuantity(sale);

    return (
        <div className="flex-1 flex flex-col gap-4 bg-[--c3] p-4 rounded-md border-solid border-t-2 border-t-[--c3-txt2] ">
            <table className="text-center border-collapse" border="1">
                <thead className="text-[--c3-txt2] uppercase ">
                    <tr>
                        <th className="font-sans">Producto</th>
                        <th className="font-sans">Cantidad</th>
                        <th className="font-sans">Precio</th>
                        <th className="font-sans">Subtotal</th>
                        <th className="font-sans">Acción</th>
                    </tr>
                </thead>
                <tbody className=" text-[--c3-txt] ">
                    {sales?.map((sale) => (
                        <TableProductItem
                            key={sale.id}
                            name={sale.name}
                            price={sale.price}
                            quantity={sale.quantity}
                            onQuantityDown={handleQuantityDown(sale)}
                            onQuantityUp={handleQuantityUp(sale)}
                            onRemove={handleRemoveSale(sale)}
                        />
                    ))}
                    {sales?.length == 0 && (
                        <tr>
                            <td colSpan="5" className="font-sans opacity-80 py-4">
                                No hay productos en la lista
                            </td>
                        </tr>
                    )}
                </tbody>
                <tfoot className=" font-bold text-[--c3-txt2] uppercase ">
                    <tr>
                        <td colSpan="2"></td>
                        <td className="font-sans">SUBTOTAL:</td>
                        <td className="font-sans">${subtotal.toFixed(2)}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colSpan="2"></td>
                        <td className="font-sans">TAX ({info?.tax}%):</td>
                        <td className="font-sans">${iva.toFixed(2)}</td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
            <Button
                as="button"
                text={"Cobrar $" + total.toFixed(2)}
                className="gap-0 bg-[--c1] text-[--c1-txt] "
                classText="font-sans text-md"
            />
        </div>
    );
}

function Search({ placeholder, onSearch }) {
    return (
        <div className="rounded-md">
            <div className="w-full flex items-center gap-1 bg-[--c3] p-3 rounded-md text-white">
                <input
                    className="flex-1 bg-transparent"
                    type="text"
                    placeholder={placeholder || "Buscar..."}
                    onChange={onSearch}
                />
                <FontAwesomeIcon icon={faSearch} />
            </div>
        </div>
    );
}

function SectionProductItem({ src, name, mark, stock, price, onClick }) {
    return (
        <button
            className="flex gap-2 p-3 bg-[--c3] rounded-md cursor-pointer transition-all hover:scale-[1.03] hover:border-2 hover:border-[--c3-txt] hover:shadow-lg"
            onClick={onClick}
        >
            <div className="h-20 aspect-square rounded-md ">
                <img
                    src={src || "https://via.placeholder.com/70"}
                    alt="Producto"
                    className="w-full h-full object-cover rounded-md"
                />
            </div>
            <div className="flex-1 flex flex-col items-start overflow-hidden ">
                <h3 className=" block w-full max-w-full font-sans leading-5 text-left text-lg text-[--c3-txt] text-ellipsis text-nowrap overflow-hidden">
                    {name || "Nombre del producto"}
                </h3>
                <p className="font-sans text-[--c3-txt2] text-ellipsis leading-5 text-nowrap overflow-hidden opacity-85 ">
                    {mark || "Categoría"}
                </p>
                <span className="text-[--c3-txt2] opacity-75 leading-5">
                    <b className="font-sans text-sm ">Stock: </b>
                    {stock || 0}
                </span>
                <span className="font-josefin font-bold text-xl text-[--c3-txt3] opacity-75 leading-5">
                    ${price || "0.00"}
                </span>
            </div>
        </button>
    );
}

function TableProductItem({ name, price, quantity, onQuantityDown, onQuantityUp, onRemove }) {
    return (
        <tr>
            <td className="font-sans">{name}</td>
            <td>
                <div className="flex justify-center items-center h-8">
                    <Button
                        as="button"
                        icon={faMinus}
                        className="aspect-square h-full"
                        onClick={onQuantityDown}
                    />
                    <span className="flex justify-center items-center aspect-square h-full font-sans">
                        {quantity}
                    </span>
                    <Button
                        as="button"
                        icon={faPlus}
                        className="aspect-square h-full"
                        onClick={onQuantityUp}
                    />
                </div>
            </td>
            <td className="font-sans">${price}</td>
            <td className="font-sans">${price * quantity}</td>
            <td>
                <div className="flex justify-center items-center py-1">
                    <Button
                        as="button"
                        icon={faTrash}
                        className="text-sm aspect-square w-8"
                        onClick={onRemove}
                    />
                </div>
            </td>
        </tr>
    );
}
